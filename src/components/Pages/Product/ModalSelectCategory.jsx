// ModalSelectCategory.jsx
import React from "react";
import styles from "./Modalblbl.module.scss";

export default function ModalSelectCategory({ onSelect, onClose }) {
  const categories = [
    { key: "favorites", label: "❤️ Любимые" },
    { key: "readingNow", label: "📖 Читаю сейчас" },
    { key: "wantToRead", label: "📌 Хочу прочитать" },
    { key: "abandoned", label: "❌ Брошено" },
  ];

  return (
    <div className={styles.modal - overlay}>
      <div className={styles.modal}>
        <h3>Добавить книгу в раздел</h3>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className={styles.modal - btn}>
            {cat.label}
          </button>
        ))}
        <button onClick={onClose} className={styles.close - btn}>
          Отмена
        </button>
      </div>
    </div>
  );
}
