import React, { useState } from "react";
import './fullscreen.css';

import { useStore } from '@nanostores/react';
import { popupLoginVisible } from '../popupstore.ts';

async function loginUser(credentials) {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: "include",
        mode: "cors"
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        const error = errorData.error
        const status = response.status
        console.log(errorData)
        return [true, {status, error}]
    }
    
    return [false, response.json()];
}

export function PopupLogin() {
    const $popupLoginVisible = useStore(popupLoginVisible);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [errDesc, setErrDesc] = useState('')
    const [passErrDesc, setPassErrDesc] = useState('')
    const handleSubmit = async e => {
        e.preventDefault();
        setError(false); // Resetea el error al iniciar el submit
        try {
            const [err, res] = await loginUser({ email, password });
            console.log({err, res})
            // Si la respuesta es un error (ej. 400), el token no será válido

            if (err == true && res.status == '400') {
                console.log(res.error)
                setErrDesc(res.error)
                setError(true); // Activa el error para inputs
            } 
            else {
                // Maneja el token si el login es exitoso
                console.log("Login exitoso", res);
                handleClose()
                window.location.reload()
            }
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            setError(true); // Activa el error si hay un problema en el fetch
        }
    };
    

    const handleClose = () => {
        popupLoginVisible.set(false);
        setError(false); // Resetea el error al cerrar
        setErrDesc('')
    };

    return (
        $popupLoginVisible ? (
            <div id="popup-login" className="flex fullscreen justify-center items-center">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Iniciar sesión</h3>
                            <button type="button" onClick={handleClose} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className={errDesc?'block mb-2 text-sm font-medium text-red-700 dark:text-red-500':'block mb-2 text-sm font-medium text-gray-900 dark:text-white'}>Correo electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className={errDesc ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'}
                                        placeholder="name@company.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    
                                </div>
                                <div>
                                    <label htmlFor="password" className={error?'block mb-2 text-sm font-medium text-red-700 dark:text-red-500':'block mb-2 text-sm font-medium text-gray-900 dark:text-white'}>Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className={error ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : 'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {errDesc && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errDesc}</p>}

                                <button id="submit-login" type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar sesión</button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    ¿No estás registrado? <a href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Crear cuenta</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        ) : (<div></div>)
    );
}
