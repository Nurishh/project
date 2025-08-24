import React, { useState, useEffect } from "react";
import BooksSlider from "./BooksSlider";
import "./App.scss";

export function Appre() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
  // http://34.31.55.189/docs/ 
  http: try {
    const response = await fetch("http://localhost:3001/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    setBooks(data.books);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
  };

  if (loading) {
    return <div className="loading">Загрузка книг...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Библиотека книг</h1>
        <p>Откройте для себя удивительный мир литературы</p>
      </header>

      <main>
        <BooksSlider books={books} />
      </main>

      <footer className="app-footer">
        <p>© 2024 Библиотека. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default App;
