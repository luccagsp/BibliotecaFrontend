import React, { useState, useEffect } from "react";
import { useStore } from '@nanostores/react';
import { popupReserveVisible, currentBookData } from './popupstore.ts';
import './bookCard.css';
import './bookCardDelete.css';

export function BookActual() {
  const [bookData, setBookData] = useState({ name: "", autor: "", id: "", coverImage: "" });
  const [noBooksMessage, setNoBooksMessage] = useState(false); // Estado para el mensaje

  useEffect(() => {
    async function getBook() {
      try {
        const res = await fetch(`http://localhost:3000/api/books/actual`, {
          mode: "cors",
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (!data || !data.id) { // Verifica si no hay libros
          setNoBooksMessage(true);
        } else {
          setBookData(data);
          setNoBooksMessage(false); // Asegúrate de resetear el mensaje si hay libros
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    getBook();
  }, []);

  function handleClick() {
    async function deleteReserve() {
      try {
        const res = await fetch(`http://localhost:3000/api/books/deleteReserve/${bookData.id}`, {
          mode: "cors",
          method: "PUT",
          credentials: "include",
        });
        const data = await res.json();
        window.location.reload();
      } catch (error) {
        console.error("Error deleting reserve:", error);
      }
    }

    deleteReserve();
  }

  return (
<div>
  {noBooksMessage ? (
    <p>No tenés libros reservados</p>
  ) : (
     <button onClick={handleClick} className="grilla-div grid p-3 border-[1px] relative">
      <div className="cover-container flex justify-center items-center w-full h-full relative">
        <div className="book ">
          <img src={bookData.coverImage} className="h-full bg-contain w-full object-cover" alt=""/>
        </div>
      </div>
      <div className="info-container flex flex-col justify-between h-full py-5 text-left"> 
        <p className="text-2xl font-bold">{bookData.name}</p>
        <p>-{bookData.autor}</p>
      </div>
      <div className="delete-overlay">
        <img src="/trash.svg" className="w-8 h-8 " alt="trash"/>
        <p className="font-bold">Eliminar</p>
      </div> {/* Contenedor para el texto */}
    </button>
  )}
</div>
  );
}
