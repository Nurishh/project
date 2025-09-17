import { useState } from "react";

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    authorId: "",
    author: "",
    genre: "",
    cover: "",
    description: "",
    publishedYear: "",
    pages: "",
    booksUrl: "",
    rating: "",
    isNew: false,
    isPopular: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    // Преобразуем genre в массив
    const bookData = {
      ...formData,
      genre: formData.genre.split(",").map((g) => g.trim()),
      publishedYear: parseInt(formData.publishedYear),
      pages: parseInt(formData.pages),
      rating: parseFloat(formData.rating),
      reviewsCount: 0,
      isNew: formData.isNew,
      isPopular: formData.isPopular,
    };

    if (
      !bookData.title ||
      !bookData.author ||
      !bookData.genre.length ||
      !bookData.cover
    ) {
      return alert("Заполни обязательные поля!");
    }

    fetch("http://localhost:3001/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Книга добавлена!");
        setFormData({
          title: "",
          authorId: "",
          author: "",
          genre: "",
          cover: "",
          description: "",
          publishedYear: "",
          pages: "",
          booksUrl: "",
          rating: "",
          isNew: false,
          isPopular: false,
        });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginBottom: "20px",
        maxWidth: "500px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "white",
      }}>
      <h2> Добавить книгу</h2>

      <input
        type="text"
        name="title"
        placeholder="Название книги*"
        value={formData.title}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <input
        type="text"
        name="author"
        placeholder="Автор*"
        value={formData.author}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <input
        type="text"
        name="authorId"
        placeholder="ID автора (число)"
        value={formData.authorId}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <input
        type="text"
        name="genre"
        placeholder="Жанры (через запятую)*"
        value={formData.genre}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <input
        type="text"
        name="cover"
        placeholder="Ссылка на обложку*"
        value={formData.cover}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <input
        type="text"
        name="booksUrl"
        placeholder="Ссылка для чтения"
        value={formData.booksUrl}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <textarea
        name="description"
        placeholder="Описание книги"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        style={{ padding: "10px" }}
      />

      <div style={{ display: "flex", gap: "15px" }}>
        <input
          type="number"
          name="publishedYear"
          placeholder="Год издания"
          value={formData.publishedYear}
          onChange={handleChange}
          style={{ padding: "10px", flex: 1 }}
        />

        <input
          type="number"
          name="pages"
          placeholder="Количество страниц"
          value={formData.pages}
          onChange={handleChange}
          style={{ padding: "10px", flex: 1 }}
        />
      </div>

      <input
        type="number"
        name="rating"
        placeholder="Рейтинг (0-5)"
        step="0.1"
        min="0"
        max="5"
        value={formData.rating}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <div style={{ display: "flex", gap: "20px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew}
            onChange={handleChange}
          />
          Новинка
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="checkbox"
            name="isPopular"
            checked={formData.isPopular}
            onChange={handleChange}
          />
          Популярная
        </label>
      </div>

      <button
        onClick={handleAdd}
        style={{
          padding: "12px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}>
        Добавить книгу
      </button>
    </div>
  );
}
