import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./AuthorProfile.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const AuthorProfile = () => {
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorAdded, setIsAuthorAdded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const loadAuthorData = async () => {
      try {
        const authorResponse = await fetch(
          `http://localhost:3001/authors/${id}`
        );
        const authorData = await authorResponse.json();
        setAuthor(authorData);

        const booksResponse = await fetch("http://localhost:3001/books");
        const allBooks = await booksResponse.json();

        const authorsBooks = allBooks.filter(
          (book) => book.authorId === id || book.author === authorData.name
        );

        setAuthorBooks(authorsBooks);

        // Проверяеm добавлен ли автор уже в избранное
        checkIfAuthorAdded();
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthorData();
  }, [id]);

  const checkIfAuthorAdded = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user-data"));
      if (!user) return;

      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const userData = await res.json();

      const myAuthors = userData.myAuthors || [];
      setIsAuthorAdded(myAuthors.includes(id));
    } catch (error) {
      console.error("Ошибка проверки автора:", error);
    }
  };

  const handleAddAuthor = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user-data"));
      if (!user) {
        alert("Пожалуйста, войдите в систему");
        return;
      }

      const res = await fetch(`http://localhost:3001/users/${user.id}`);
      const userData = await res.json();

      //  получаем массив myAuthors
      const myAuthors = userData.myAuthors || [];

      if (myAuthors.includes(id)) {
        // Если автор уже добавлен - удаляем
        const updatedAuthors = myAuthors.filter((authorId) => authorId !== id);

        await fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ myAuthors: updatedAuthors }),
        });

        setIsAuthorAdded(false);
        alert("Автор удален из избранных");
      } else {
        //  не добавлен - добавляем
        const updatedAuthors = [...myAuthors, id];

        await fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ myAuthors: updatedAuthors }),
        });

        setIsAuthorAdded(true);
        alert("Автор добавлен в избранные!");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка при изменении списка авторов");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка автора...</div>;
  }

  if (!author) {
    return <div className={styles.error}>Автор не найден</div>;
  }

  return (
    <div className={styles.container}>
      {/* Профиль  */}
      <div className={styles.authorSection}>
        <div className={styles.authorHeader}>
          <div className={styles.authorImage}>
            <img
              src={author.photo}
              alt={author.name}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/200x200/cccccc/ffffff?text=Фото+автора";
              }}
            />
          </div>

          <div className={styles.authorInfo}>
            <h1>{author.name}</h1>

            <div className={styles.metaInfo}>
              {author.nationality && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Национальность:</span>
                  <span className={styles.metaValue}>{author.nationality}</span>
                </div>
              )}

              {author.birthDate && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Дата рождения:</span>
                  <span className={styles.metaValue}>{author.birthDate}</span>
                </div>
              )}

              {author.website && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Вебсайт:</span>
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.websiteLink}>
                    {author.website}
                  </a>
                </div>
              )}
            </div>

            {author.genres && author.genres.length > 0 && (
              <div className={styles.genres}>
                <h3>Жанры:</h3>
                <div className={styles.genreTags}>
                  {author.genres.map((genre, index) => (
                    <span key={index} className={styles.genreTag}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            
            <button
              className={`${styles.readButton} ${
                isAuthorAdded ? styles.added : ""
              }`}
              onClick={handleAddAuthor}>
              {isAuthorAdded
                ? "✓ Добавлено"
                : "+ Добавить автора"}
            </button>
          </div>
        </div>

        {author.bio && (
          <div className={styles.bioSection}>
            <h2>Биография</h2>
            <div className={styles.bioText}>
              {author.bio.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Книги автора */}
      <div className={styles.booksSection}>
        <h2>Книги автора ({authorBooks.length})</h2>

        {authorBooks.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Книги этого автора пока не добавлены в каталог</p>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            loop={true}>
            {authorBooks.map((book) => (
              <SwiperSlide key={book.id}>
                <div className={styles.bookCard}>
                  <Link to={`/book/${book.id}`} className={styles.bookLink}>
                    <img
                      src={book.cover}
                      alt={book.title}
                      className={styles.bookCover}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150x200/cccccc/ffffff?text=Обложка+книги";
                      }}
                    />
                    <div className={styles.bookInfo}>
                      <h3 className={styles.bookTitle}>{book.title}</h3>
                      <p className={styles.bookYear}>
                        {book.publishedYear} год
                      </p>
                      <div className={styles.rating}>
                        ⭐ {book.rating || "Нет оценки"}
                      </div>
                    </div>
                  </Link>

                  {book.genre && book.genre.length > 0 && (
                    <div className={styles.bookGenres}>
                      {book.genre.slice(0, 2).map((genre, index) => (
                        <span key={index} className={styles.bookGenreTag}>
                          {genre}
                        </span>
                      ))}
                      {book.genre.length > 2 && (
                        <span className={styles.moreGenres}>
                          +{book.genre.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
