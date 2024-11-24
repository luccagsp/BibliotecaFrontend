import React from 'react'

function Posts({books}) {
  console.log(typeof books)
  return (

    <div>

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3">
                      Nombre
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Autor
                  </th>
                  <th scope="col" class="px-6 py-3">
                      User ID
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
{/*             
            {console.log(books)}
            {Object.entries(books).forEach((book) => (
              <tr class="odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                      {book.name}
                  </th>
                  <td class="px-6 py-4">
                      {book.autor}
                  </td>
                  <td class="px-6 py-4">
                      {book.userId}
                  </td>
                  <td class="px-6 py-4">
                      <a href="#" class="font-medium text-blue-600 :text-blue-500 hover:underline">Eliminar</a>
                  </td>
              </tr>
            ))} */}
          </tbody>
      </table>  
    </div>


  )
}

export default Posts