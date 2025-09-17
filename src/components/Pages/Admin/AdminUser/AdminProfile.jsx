import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminProfile.module.scss";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [adminBooks, setAdminBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных администратора и его книг
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        // Загружаем пользователей и находим админа
        const usersResponse = await fetch("http://localhost:3001/users");
        const users = await usersResponse.json();
        const adminUser = users.find((user) => user.role === "admin");

        if (adminUser) {
          setAdmin(adminUser);

          // Загружаем книги и фильтруем по автору (если у вас есть поле authorId)
          const booksResponse = await fetch("http://localhost:3001/books");
          const allBooks = await booksResponse.json();

          // Предположим, что admin добавил книги - здесь нужно адаптировать под вашу структуру
          const adminBooks = allBooks.filter(
            (book) =>
              book.addedBy === adminUser.id || // если у вас есть такое поле
              book.author === adminUser.name // или по имени автора
          );

          setAdminBooks(adminBooks);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (!admin) {
    return <div className={styles.error}>Администратор не найден</div>;
  }

  return (
    <div className={styles.container}>
      {/* Профиль администратора */}
      <div className={styles.profileSection}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {admin.name ? admin.name[0].toUpperCase() : "A"}
          </div>
          <div className={styles.profileInfo}>
            <h1>
              {admin.name} {admin.lastName}
            </h1>
            <p className={styles.role}>Администратор</p>
            <p className={styles.email}>{admin.email}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{adminBooks.length}</span>
                <span className={styles.statLabel}>Книг добавлено</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/admin" className={styles.actionButton}>
            Панель управления
          </Link>
          <Link to="/admin/add-book" className={styles.actionButton}>
            Добавить книгу
          </Link>
          <Link to="/admin/add-author" className={styles.actionButton}>
            Добавить автора
          </Link>
        </div>
      </div>

      {/* Книги администратора */}
      <div className={styles.booksSection}>
        <h2>Мои книги ({adminBooks.length})</h2>

        {adminBooks.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Вы еще не добавили ни одной книги</p>
            <Link to="/admin/add-book" className={styles.addBookButton}>
              Добавить первую книгу
            </Link>
          </div>
        ) : (
          <div className={styles.booksGrid}>
            {adminBooks.map((book) => (
              <div key={book.id} className={styles.bookCard}>
                <Link to={`/book/${book.id}`} className={styles.bookLink}>
                  <img
                    src={book.cover}
                    alt={book.title}
                    className={styles.bookCover}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150x200/cccccc/ffffff?text=Нет+изображения";
                    }}
                  />
                  <div className={styles.bookInfo}>
                    <h3 className={styles.bookTitle}>{book.title}</h3>
                    <p className={styles.bookAuthor}>{book.author}</p>
                    <p className={styles.bookYear}>{book.publishedYear}</p>
                    <div className={styles.rating}>
                      ⭐ {book.rating || "Нет оценки"}
                    </div>
                  </div>
                </Link>

                <div className={styles.bookActions}>
                  <Link
                    to={`/admin/edit-book/${book.id}`}
                    className={styles.editButton}>
                    Редактировать
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
