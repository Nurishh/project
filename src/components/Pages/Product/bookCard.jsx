// BookCard.jsx
import React, { useState } from "react";
import ModalSelectCategory from "./ModalSelectCategory";

export default function BookCard({ book, user, setUser }) {
  const [showModal, setShowModal] = useState(false);

  const handleSelectCategory = async (category) => {
    const updatedList = [...user[category], book.id];

    await fetch(`http://localhost:4000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [category]: updatedList }),
    });

    setUser({ ...user, [category]: updatedList });
    setShowModal(false);
    alert(`Книга добавлена в "${category}"`);
  };

  return (
    <div className="book-card">
      <img src={book.cover} alt={book.title} />
      <h3>{book.title}</h3>
      <button onClick={() => setShowModal(true)}>➕ Добавить</button>

      {showModal && (
        <ModalSelectCategory
          onSelect={handleSelectCategory}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
