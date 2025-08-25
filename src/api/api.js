// services/api.js
import axios from "axios";

// Все книги
export async function getBooks() {
  const response = await axios.get("/api/books/");
  return response.data;
}

// Жанры
export async function getGenres() {
  const response = await axios.get("/api/genres/");
  return response.data;
}

// Регистрация
export async function registerUser(userData) {
  const response = await axios.post("/account/register/", userData);
  return response.data;
}

// Логин
export async function loginUser(userData) {
  const response = await axios.post("/account/login/", userData);
  return response.data;
}

// Добавить книгу (для админки)
export async function addBook(bookData) {
  const response = await axios.post("/api/books/", bookData);
  return response.data;
}

// Добавить жанр (для админки)
export async function addGenre(genreData) {
  const response = await axios.post("/api/genres/", genreData);
  return response.data;
}
