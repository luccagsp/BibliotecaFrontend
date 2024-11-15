import React, { useState, useEffect } from "react";
import { useStackStore } from "../store/stackStore.js";
import './bookCard.css'

export function Login({}) {
  return(
    <form>
      <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Correo electronico</label>
          <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="john.doe@company.com" required />
      </div> 
      <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Cotraseña</label>
          <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••" required />
      </div> 
      <button type="submit" id="submit-register" class="w-[400px] text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Registrar</button>
  </form>
  )
}