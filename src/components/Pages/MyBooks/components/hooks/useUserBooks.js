
import { useState, useEffect } from "react";

export const useUserBooks = (section) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, [section]);

  const loadBooks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user-data"));
      if (!user) {
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const userData = await res.json();

      // Получаем ID книг из нужного раздела
      const bookIds = userData.myBooks?.[section] || [];

      // Загружаем данные каждой книги
      const booksData = await Promise.all(
        bookIds.map(async (bookId) => {
          const bookRes = await fetch(`http://localhost:3001/books/${bookId}`);
          return bookRes.json();
        })
      );

      setBooks(booksData);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка загрузки книг:", error);
      setLoading(false);
    }
  };

  return { books, loading, refresh: loadBooks };
};
