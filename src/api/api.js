
import axios from "axios";

const api = axios.create();

const baseURL = import.meta.env.VITE_API_URL;

axiosInstance.defaults.baseURL = baseURL;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers["Content-Type"] = "application/json";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;


// пример как в дрeгих использоватть js-------------books
// import api from "./api";

// // получить все книги
// export const getBooks = () => api.get("/books");

// // получить книгу по id
// export const getBookById = (id) => api.get(`/books/${id}`);

// // добавить книгу
// export const addBook = (book) => api.post("/books", book);

// // обновить книгу
// export const updateBook = (id, book) => api.put(`/books/${id}`, book);

// // удалить книгу
// export const deleteBook = (id) => api.delete(`/books/${id}`);




// пример в jsx вывести --------
// import { useEffect, useState } from "react";
// import { getBooks } from "../api/books";

// export default function Books() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     getBooks().then((res) => setBooks(res.data));
//   }, []);

//   return (
//     <div>
//       <h1>Список книг</h1>
//       <ul>
//         {books.map((book) => (
//           <li key={book.id}>
//             {book.title} — {book.author}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
