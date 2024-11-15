import React, { useState, useEffect } from "react";
import { useStackStore } from "../store/stackStore.js";
import { BookCard } from "./BookCard.jsx";
import './BookList.css'

export function BookList({bookData}) {
  return(
    <div className="grilla grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {bookData.map((book,index) => {
        return (
          <BookCard
            key={index}
            name={book.name}
            autor={book.autor}
            bookId={book.id}
            userId={book.userId}
            coverImage={book.coverImage}
          />
        )
      })}
    </div>
  )
}