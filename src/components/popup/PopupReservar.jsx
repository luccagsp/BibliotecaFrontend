import React, { useState } from "react";


import { useStore } from '@nanostores/react';
import { popupReserveVisible,popupLoginVisible,currentBookData,popupErrorVisible } from '../popupstore.ts';


import './fullscreen.css';

export function PopupReserve() {
    const $popupReserveVisible = useStore(popupReserveVisible);
    const $popupLoginVisible = useStore(popupLoginVisible);
    const $popupErrorVisible = useStore(popupErrorVisible);
    const $bookData = useStore(currentBookData)
    
    async function reserveFetch() {
        try {
            const {name,autor,bookId} = $bookData
            console.log(name,autor,bookId)
            const res = await fetch(`http://localhost:3000/api/books/reserve/${bookId}`, {
                mode: "cors",
                method: "PUT",
                credentials: "include",
            }); 

            const data = await res.json();
            if (data.error === "auth token not found (possibly unlogged)") {
                popupLoginVisible.set(true)
                popupReserveVisible.set(false)
                return
            }
            if (data.error === `Book with bookId ${bookId} not found`) {
                console.log(data.error)
                return
            }
            if (data.error === `User already has a book allocated`) {
                popupReserveVisible.set(false)
                popupErrorVisible.set(true)
                return
            }
            window.location.href = "/";

        } catch (error) {
            console.log("nada")
        }
    }

    const handleClose = () => {
        popupReserveVisible.set(false);
    }
    return (
        $popupReserveVisible ? (
            <div id="popup" className="flex fullscreen justify-center items-center">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                ¿Estás seguro de reservar el libro?
                            </h3>
                            <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Si lo reservas no vas a poder volver a reservar otro hasta la semana
                                que viene
                            </p>

                            <button
                                id="sure"
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                onClick={reserveFetch}
                            >Si, estoy seguro</button
                            >
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={handleClose}
                            >No, cancelar</button
                            >
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className=""></div>
        )
    );
}