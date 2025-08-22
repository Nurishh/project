import { useEffect, useState } from "react";

export default function BookList() {
  const [books, setBooks] = useState([]);

  const loadBooks = () => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}>
      {books.map((book) => (
        <div
          key={book.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}>
          <img
            src={book.image}
            alt={book.title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <h3 style={{ margin: "10px 0" }}>{book.title}</h3>
          <p>
            <b>Автор:</b> {book.author}
          </p>
          <p>
            <b>Категория:</b> {book.category}
          </p>
          <p style={{ fontSize: "14px", color: "#555" }}>{book.koroche}</p>
        </div>
      ))}
    </div>
  );
}
