import { useEffect, useState } from "react";
import { getBooks } from "../../../../api/api";

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
      <h1>Книги ({books.length})</h1>
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <img src={book.cover_image} alt={book.title} />
          <h3>{book.title}</h3>
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
