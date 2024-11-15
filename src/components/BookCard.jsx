import React, { useState, useEffect } from "react";


import { useStore } from '@nanostores/react';
import { popupReserveVisible, currentBookData } from './popupstore.ts';


import './bookCard.css'
// import { useModal } from "../components/ModalContext.jsx"; // Importar el contexto


export function BookCard({name, autor, bookId, userId, coverImage}) {
  
  const $popupReserveVisible = useStore(popupReserveVisible);
  const $currentBookData = useStore(currentBookData);
  console.log({name, autor, bookId, userId, coverImage})

  function handleClick() {
    
    console.log("clicked")
    popupReserveVisible.set(true)
    currentBookData.set({name, autor, bookId})
  }
  return(
    !userId ? (

    <button onClick={handleClick} className="grilla-div grid p-3 border-[1px]">
      <div className="cover-container flex justify-center items-center w-full h-full relative">
        <div className="book ">
          <img src={coverImage} className="h-full bg-contain w-full object-cover"/>
        </div>
      </div>
      <div className="info-container flex flex-col justify-between h-full py-5 text-left"> 
        <p className="text-2xl font-bold">{name}</p>
        <p>-{autor}</p>
      </div>
    </button>

    ):(
    <div className="grilla-div grid p-3 border-[1px] opacity-50">
      <div className="cover-container flex justify-center items-center w-full h-full relative">
        <div className="book ">
            <img src={coverImage} className="h-full bg-contain w-full object-cover"/>
        </div>
      </div>
      <div className="info-container flex flex-col justify-between py-5">
          <p className="text-2xl font-bold">{name}</p>
          <p>-{autor}</p>
      </div>
    </div>

    )
  )
}