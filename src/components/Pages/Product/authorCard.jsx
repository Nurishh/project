// AuthorCard.jsx
import React from "react";

export default function AuthorCard({ author, user, setUser }) {
  const handleAddAuthor = async () => {
    const updatedList = [...user.authorsList, author.id];

    await fetch(`http://localhost:4000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authorsList: updatedList }),
    });

    setUser({ ...user, authorsList: updatedList });
    alert(`Автор добавлен в список`);
  };

  return (
    <div className="author-card">
      <img src={author.photo} alt={author.name} />
      <h3>{author.name}</h3>
      <button onClick={handleAddAuthor}>➕ В мои авторы</button>
    </div>
  );
}
