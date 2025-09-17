import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Booklist.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [groupedBooks, setGroupedBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/books");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBooks(data);

      // группировка по жанрам
      const groups = {};
      data.forEach((book) => {
        book.genre?.forEach((g) => {
          if (!groups[g]) groups[g] = [];
          groups[g].push(book);
        });
      });
      setGroupedBooks(groups);

      setError(null);
    } catch (err) {
      console.error("Ошибка загрузки книг:", err);
      setError("Не удалось загрузить книги. Проверьте, запущен ли json-server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) return <div className={styles.center}>Загрузка...</div>;
  if (error) return <div className={styles.center}>{error}</div>;

  return (
    <div className={styles.catalog}>
      {/* каждый жанр со своим слайдером */}
      {Object.keys(groupedBooks).map((genre) => (
        <div key={genre} className={styles.genreBlock}>
          <h2 className={styles.genreTitle}>{genre}</h2>

          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 1 }, 
              480: { slidesPerView: 2 }, 
              768: { slidesPerView: 3 }, 
              // 1024: { slidesPerView: 4 }, 
            }}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000 }}
            loop={true}
            className={styles.swiper}>
            {groupedBooks[genre].map((book) => (
              <SwiperSlide key={book.id}>
                <div className={styles.cart}>
                  <Link to={`/book/${book.id}`} className={styles.id}>
                    <img
                      src={book.cover}
                      alt={book.title}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x300/cccccc/ffffff?text=Нет+изображения";
                      }}
                    />
                    <h3>{book.title}</h3>
                    <p>
                      <b>Автор:</b> {book.author}
                    </p>
                    <p>
                      <b>Жанры:</b> {book.genre?.join(", ")}
                    </p>
                    <p>
                      <b>Год:</b> {book.publishedYear || "Не указан"}
                    </p>
                    <div>
                      <span className={styles.rating}>
                        ⭐ {book.rating || "Нет оценки"}
                      </span>
                      <span className={styles.reviewsCount}>
                        {book.reviewsCount || 0} отзывов
                      </span>
                    </div>
                  </Link>
                  {book.isNew && <span className={styles.isNew}>NEW</span>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}

      {/*Все " */}
      <div className={styles.genreBlock}>
        <h2 className={styles.genreTitle}>Все книги</h2>
        <div className={styles.div}>
          {books.map((book) => (
            <div key={book.id} className={styles.cart}>
              <Link to={`/book/${book.id}`} className={styles.id}>
                <img
                  src={book.cover}
                  alt={book.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200x300/cccccc/ffffff?text=Нет+изображения";
                  }}
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
