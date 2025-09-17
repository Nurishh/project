import AddBook from "../../../Catalog/AddBook";
import styles from "./AdminAddBooks.module.scss";
import AddAuthor from "./Author/AddAuthor";
// import AuthorPage from "./Author/AuthorPaje";

import { useState } from "react";

export function AdminAddBooks() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontFamily: "var(--font-basic)",
          color: "var(--milkColor)",
        }}>
        Админка
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          borderBottom: "2px solid #ddd",
        }}>
        <button
          onClick={() => setActiveTab("books")}
          style={{
            padding: "10px 20px",
            background: activeTab === "books" ? "#007bff" : "transparent",
            color: activeTab === "books" ? "white" : "#333",
            border: "none",
            borderRadius: "6px 6px 0 0",
            cursor: "pointer",
          }}>
          📚 Книги
        </button>
        <button
          onClick={() => setActiveTab("authors")}
          style={{
            padding: "10px 20px",
            background: activeTab === "authors" ? "#007bff" : "transparent",
            color: activeTab === "authors" ? "white" : "#333",
            border: "none",
            borderRadius: "6px 6px 0 0",
            cursor: "pointer",
          }}>
          👨‍💼 Авторы
        </button>
      </div>

      {activeTab === "books" && <AddBook />}
      {activeTab === "authors" && <AddAuthor />}
    </div>
  );
}
