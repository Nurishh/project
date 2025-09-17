import { useState } from "react";

export default function AddAuthor() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    photo: "",
    birthDate: "",
    nationality: "",
    website: "",
    genres: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAuthor = () => {
    // Преобразуем genres в массив и popularity в число
    const authorData = {
      ...formData,
      genres: formData.genres.split(",").map((g) => g.trim()),
      popularity: parseInt(formData.popularity) || 0,
    };

    if (!authorData.name || !authorData.bio) {
      return alert("Заполни имя и биографию!");
    }

    fetch("http://localhost:3001/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authorData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Автор добавлен!");
        setFormData({
          name: "",
          bio: "",
          photo: "",
          birthDate: "",
          nationality: "",
          website: "",
          genres: "",
        });
      })
      .catch((error) => {
        console.error("Error adding author:", error);
        alert("Ошибка при добавлении автора");
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
        background: "#f9f9f9",
      }}>
      <h2> Добавить автора</h2>

      <input
        type="text"
        name="name"
        placeholder="Полное имя автора*"
        value={formData.name}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <textarea
        name="bio"
        placeholder="Биография автора*"
        value={formData.bio}
        onChange={handleChange}
        rows="4"
        style={{ padding: "10px" }}
      />

      <input
        type="text"
        name="photo"
        placeholder="Ссылка на фото автора"
        value={formData.photo}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="date"
          name="birthDate"
          placeholder="Дата рождения"
          value={formData.birthDate}
          onChange={handleChange}
          style={{ padding: "10px", flex: 1 }}
        />

        <input
          type="text"
          name="nationality"
          placeholder="Национальность"
          value={formData.nationality}
          onChange={handleChange}
          style={{ padding: "10px", flex: 1 }}
        />
      </div>

      <input
        type="url"
        name="website"
        placeholder="Веб-сайт (https://...)"
        value={formData.website}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <input
        type="text"
        name="genres"
        placeholder="Жанры (через запятую)*"
        value={formData.genres}
        onChange={handleChange}
        style={{ padding: "10px" }}
      />

      <button
        onClick={handleAddAuthor}
        style={{
          padding: "12px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}>
        Добавить автора
      </button>

      {/* Подсказки */}
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          background: "#e7f3ff",
          borderRadius: "6px",
          fontSize: "14px",
        }}>
        <strong>💡 Подсказки:</strong>
        <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
          <li>Жанры: фэнтези, научная фантастика, роман, детектив</li>
          <li>Фото: можно использовать ссылки с Unsplash</li>
        </ul>
      </div>
    </div>
  );
}
