import React, { useState, useEffect } from "react";
import { Login } from "./Login.jsx";

export function User() {
  const [userData, setUserData] = useState([]);
  const [iniciales, setIniciales] = useState("");
  const [err, setErr] = useState();
  const [showTooltip, setShowTooltip] = useState(false);

  async function handleLogout() {
    const res = await fetch(`http://localhost:3000/api/auth/logout`, {
      mode: "cors",
      method: "POST",
      credentials: "include",
    });
    window.location.reload()
    console.log(res.json())
  };

  useEffect(() => {
    async function getBooks() {
      try {
        const res = await fetch(`http://localhost:3000/api/auth/user-profile`, {
          mode: "cors",
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) {
          setErr(true);
          console.log(data.error);
          return;
        }
        setUserData(data);
        const palabras = data.name.split(" ");
        const iniciales = palabras.slice(0, 2).map(word => word[0].toUpperCase());
        setIniciales(iniciales.join("").toUpperCase());
      } catch (error) {
        console.error("Error fetching books:", error);
        setErr(true);
      }
    }
    getBooks();
  }, []); // Solo se ejecuta al montar el componente

  // Mostrar/ocultar el elemento con id "userDropdown"
  useEffect(() => {
    const dropdown = document.getElementById("userDropdown");
    if (dropdown) {
      if (showTooltip) {
        dropdown.classList.remove("hidden"); // Mostrar dropdown
      } else {
        dropdown.classList.add("hidden"); // Ocultar dropdown
      }
    }
  }, [showTooltip]);

  if (err === true)
    return (
      <div className="flex justify-center items-center flex-col">

      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <p>{iniciales}</p>
        <svg
          className="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
        
      </div>
      </div>

    );

  return (
    <div className="flex justify-center items-center flex-col">
    <div
      className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden  rounded-full bg-gray-600"
      onClick={() => setShowTooltip(!showTooltip)}
      
      >
      <button
        className="font-medium text-gray-600 dark:text-gray-300"
      >
        {iniciales}
      </button>
    </div>
    <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
