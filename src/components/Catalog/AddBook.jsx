import { useState } from "react";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [koroche, setKoroche] = useState("");

  const handleAdd = () => {
    if (!title || !author || !category || !image || !koroche) {
      return alert("Заполни все поля!");
    }

    fetch("http://localhost:3001/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, category, image, koroche }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Книга добавлена!");
        setTitle("");
        setAuthor("");
        setCategory("");
        setImage("");
        setKoroche("");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
        maxWidth: "400px",
      }}>
      <h2>➕ Добавить книгу</h2>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Автор"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Категория"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ссылка на картинку"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <textarea
        placeholder="Описание"
        value={koroche}
        onChange={(e) => setKoroche(e.target.value)}
        rows="4"
      />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
}
