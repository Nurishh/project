import { useEffect, useState } from "react";
import { getBooks } from "../../../../api/api";
import  styles  from "./Book.module.scss";

export function Books() {
  const [books, setBooks] = useState([]); // ← Здесь setBooks
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        console.log("Полный ответ API:", data);

        setBooks(data.results); // ← setBooks, а не setBook!
      } catch (err) {
        setError("Ошибка загрузки книг");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Загрузка книг...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className={styles.num}>Книги ({books.length})</h1>
      {books.map((book) => (
        <div key={book.id} className={styles.cart}>
          <img
            src={book.cover_image}
            alt={book.title}
            className={styles.imgBooks}
          />
          <h3 className={styles.namebook}>{book.title}</h3>
          <p>Автор: {book.author}</p>
          <p>Рейтинг: ⭐ {book.average_rating || "Нет оценок"}</p>
          <a href={book.file} target="_blank" rel="noopener noreferrer">
            Читать книгу
          </a>
        </div>
      ))}
    </div>
  );
}
