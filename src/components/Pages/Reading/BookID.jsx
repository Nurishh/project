import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookId.module.scss";

const BookID = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  // Загрузка книги
  const loadBook = () => {
    fetch(`http://localhost:3001/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Книга не найдена");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadBook();
  }, [id]);

  
  const handleAddToSection = async (section) => {
    try {
      // Получаем текущего юзера
      const user = JSON.parse(localStorage.getItem("user-data"));

      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const userData = await res.json();

      // страуктура 
      const myBooks = {
        favorite:
          userData.myBooks?.favorite || userData.myshots?.favorite || [],
        readingNow:
          userData.myBooks?.readingNow || userData.myshots?.readingNow || [],
        finished:
          userData.myBooks?.finished || userData.myshots?.finished || [],
        wantToRead:
          userData.myBooks?.wantToRead || userData.myshots?.wantToRead || [],
        abandoned:
          userData.myBooks?.abandoned || userData.myshots?.abandoned || [],
        other: userData.myBooks?.other || userData.myshots?.other || [],
        all: userData.myBooks?.all || userData.myshots?.all || [],
      };

      // Удаляем книгу из всех разделов (кроме all и текущего)
      Object.keys(myBooks).forEach((key) => {
        if (key !== "all" && key !== section && Array.isArray(myBooks[key])) {
          myBooks[key] = myBooks[key].filter((bookId) => bookId !== id);
        }
      });

      // Добавляем в выбранный раздел
      if (!myBooks[section].includes(id)) {
        myBooks[section].push(id);
      }

      // Добавляем в раздел "all"
      if (!myBooks.all.includes(id)) {
        myBooks.all.push(id);
      }

      // Обновляем данные пользвт
      await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          myBooks: myBooks,
          myshots: undefined, // Удаляем старое если еть конечно
        }),
      });

      // Обновляем статус книги
      setBook((prev) => ({ ...prev, status: section }));
      setOpen(false);
      alert(`Книга добавлена в "${getSectionName(section)}"`);
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка при добавлении книги");
    }
  };

  
  const getSectionName = (section) => {
    const sectionNames = {
      favorite: "любимые",
      readingNow: "читаю сейчас",
      finished: "прочитано",
      wantToRead: "хочу прочитать",
      abandoned: "брошено",
      other: "другое",
    };
    return sectionNames[section] || section;
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (!book) return <div className={styles.error}>Книга не найдена</div>;

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
            {book.genre.map((genre, i) => (
              <span key={i} className={styles.genreTag}>
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

           
            <div className={styles.addSection}>
              <button
                className={`${styles.readButton} ${
                  book.status ? styles.hasStatus : ""
                }`}
                onClick={() => setOpen(!open)}>
                {book.status
                  ? `✓ ${getSectionName(book.status)}`
                  : "+ добавить в мои книги"}
              </button>

              {open && (
                <div className={styles.sectionsDropdown}>
                  {[
                    "favorite",
                    "readingNow",
                    "finished",
                    "wantToRead",
                    "abandoned",
                    "other",
                  ].map((section) => (
                    <button
                      key={section}
                      className={styles.sectionButton}
                      onClick={() => handleAddToSection(section)}>
                      {book.status === section ? "✓ " : "+ "}
                      {getSectionName(section)}
                    </button>
                  ))}
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
