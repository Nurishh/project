import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookId.module.scss";

const BookID = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Получаем ID из URL
  const [open, setOpen] = useState(false);

  const handleAddToSection = async (section) => {
    try {
      await fetch(`http://localhost:3001/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: section }),
      });

      setBook((prev) => ({ ...prev, status: section }));
      setOpen(false);
    } catch (error) {
      console.error("Ошибка добавления:", error);
    }
  };

  const loadBook = () => {
    fetch(`http://localhost:3001/books/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Книга не найдена");
        }
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки книги:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadBook();
  }, [id]); // Зависимость от id

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (!book) {
    return <div className={styles.error}>Книга не найдена</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.bookCard}>
        <div className={styles.bookCover}>
          <img src={book.cover} alt={book.title} />
        </div>

        <div className={styles.bookInfo}>
          <h1 className={styles.title}>{book.title}</h1>
          <p className={styles.author}>Автор: {book.author}</p>

          <div className={styles.genres}>
            {book.genre.map((genre, index) => (
              <span key={index} className={styles.genreTag}>
                {genre}
              </span>
            ))}
          </div>

          <p className={styles.year}>Год публикации: {book.publishedYear}</p>
          <p className={styles.pages}>Страниц: {book.pages}</p>
          <p className={styles.rating}>Рейтинг: {book.rating} ★</p>

          <div className={styles.description}>
            <h3>Описание</h3>
            <p>{book.description}</p>
          </div>

          <div className={styles.colum}>
            <a
              href={book.booksUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.readButton}>
              Читать книгу
            </a>

            <div>
              {/* кнопка */}
              <button
                className={styles.readButton}
                onClick={() => setOpen(!open)}>
                {book.status ? book.status : "+ добавить"}
              </button>

              {/* выпадающий список */}
              {open && (
                <div>
                  <button
                    className={styles.division}
                    onClick={() => handleAddToSection("favorite")}>
                    + любимые
                  </button>
                  <button
                    className={styles.division}
                    onClick={() => handleAddToSection("reading")}>
                    + читаю сейчас
                  </button>
                  <button
                    className={styles.division}
                    onClick={() => handleAddToSection("finished")}>
                    + прочитано
                  </button>
                  <button
                    className={styles.division}
                    onClick={() => handleAddToSection("wantread")}>
                    + хочу прочитать
                  </button>
                  <button
                    className={styles.division}
                    onClick={() => handleAddToSection("dropped")}>
                    + брошено
                  </button>
                  <button
                    className={styles.division}
                    onClick={() => handleAddToSection("other")}>
                    + другое
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookID;
