import React, { useState, useEffect } from "react";
import { useStackStore } from "../store/stackStore.js";
import { BookList } from "./BookList.jsx";
import { Login } from "./Login.jsx";
// import { envs } from "../config/envs";

export function BookDisplay() {  
  const [booksData, setBooksData] = useState([]);
  const [page, setPage] = useState(1);
  const [err, setErr] = useState();

  useEffect(() => {
    async function getBooks() {
      try {
        
        const res = await fetch(`http://localhost:3000/api/books?page=${page}`, {
          mode: "cors",
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if(data.error) {
          setErr(true)
          return
        }
        setBooksData(prev => [...prev, ...data]);
        console.log("bookData")
        console.log(booksData)
      } catch (error) {
        // setErr(true)
        console.error("Error fetching books:", error);
      }
    }
    
    getBooks();
  }, [page]);
  
  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight;
      const top = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      
      if (windowHeight + top + 1 >= height) {
        setPage((prev) => prev + 1);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (err===true) return (
    <Login></Login>
    // <div className="w-full h-[100px] bg-red-200"></div>
  )
  return (
    <BookList bookData={booksData} />
  );
}