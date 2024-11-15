import React, { useState } from "react";
import './fullscreen.css';

import { useStore } from '@nanostores/react';
import { popupErrorVisible } from '../popupstore.ts';

export function PopupError() {
    const $popupErrorVisible = useStore(popupErrorVisible)

    const handleClose = async e => {
        e.preventDefault();
        popupErrorVisible.set(false);
    }

    return (
        $popupErrorVisible ? (
            <div id="popup-login" className="fullscreen flex justify-center items-center">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button onClick={handleClose} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="successModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="w-12 h-12 rounded-full bg-red-500  flex items-center justify-center mx-auto mb-3.5">
                            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg><span className="sr-only">Success</span>
                        </div>
                        <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">No se puede reservar más de un libro</p>
                        <button onClick={handleClose} data-modal-toggle="successModal" type="button" className="bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-purple-300 py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        ) : (<div></div>)
    );
}