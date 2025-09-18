
import { Link } from "react-router-dom";
import styles from "./BookGrid.module.scss";

export const BookGrid = ({ books, title }) => {
  if (!books || books.length === 0) {
    return (
      <div className={styles.container}>
        <h2>{title}</h2>
        <p>В этом разделе пока нет книг</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>
        {title} ({books.length})
      </h2>
      <div className={styles.booksGrid}>
        {books.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <Link to={`/book/${book.id}`} className={styles.bookLink}>
              <img src={book.cover} alt={book.title} className={styles.cover} />
              <h3>{book.title}</h3>
              <p className={styles.author}>{book.author}</p>
              <p className={styles.rating}>★ {book.rating}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
