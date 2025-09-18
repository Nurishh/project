import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Authors.module.scss";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserAuthors();
  }, []);

  const loadUserAuthors = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user-data"));
      if (!user) {
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const userData = await res.json();

      const authorIds = userData.myAuthors || [];

      // Загр данные каждого автора
      const authorsData = await Promise.all(
        authorIds.map(async (authorId) => {
          try {
            const authorRes = await fetch(
              `http://localhost:3001/authors/${authorId}`
            );
            if (authorRes.ok) {
              return authorRes.json();
            }
            return null;
          } catch (error) {
            console.error(`Ошибка загрузки автора ${authorId}:`, error);
            return null;
          }
        })
      );

      // Фильтруем null значения 
      const validAuthors = authorsData.filter((author) => author !== null);
      setAuthors(validAuthors);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка загрузки авторов:", error);
      setLoading(false);
    }
  };

  const removeAuthor = async (authorId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user-data"));
      if (!user) return;

      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const userData = await res.json();

      const updatedAuthors = (userData.myAuthors || []).filter(
        (id) => id !== authorId
      );

      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myAuthors: updatedAuthors }),
      });

      // Обновл
      setAuthors(authors.filter((author) => author.id !== authorId));
      alert("Автор удален из избранных");
    } catch (error) {
      console.error("Ошибка удаления автора:", error);
      alert("Ошибка при удалении автора");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка авторов...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Мои авторы</h1>

      {authors.length === 0 ? (
        <div className={styles.emptyState}>
          <p>У вас пока нет избранных авторов</p>
          <p>Добавляйте авторов на их страницах профилей!</p>
        </div>
      ) : (
        <div className={styles.authorsGrid}>
          {authors.map((author) => (
            <div key={author.id} className={styles.authorCard}>
              <Link to={`/author/${author.id}`} className={styles.authorLink}>
                <div className={styles.authorImage}>
                  <img
                    src={author.photo}
                    alt={author.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150x150/cccccc/ffffff?text=Фото";
                    }}
                  />
                </div>

                <div className={styles.authorInfo}>
                  <h3 className={styles.authorName}>{author.name}</h3>

                  {author.nationality && (
                    <p className={styles.authorNationality}>
                      {author.nationality}
                    </p>
                  )}

                  {author.genres && author.genres.length > 0 && (
                    <div className={styles.authorGenres}>
                      {author.genres.slice(0, 2).map((genre, index) => (
                        <span key={index} className={styles.genreTag}>
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>

              {/* <button
                className={styles.removeButton}
                onClick={() => removeAuthor(author.id)}
                title="Удалить из избранных">
                ×
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
