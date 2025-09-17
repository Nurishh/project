import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./AuthorPage.module.scss";

export default function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  if (!authors.length) {
    return <div className={styles.loading}>Загрузка авторов...</div>;
  }

  return (
    <div className={styles.container}>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000 }}
        loop={true}
        className={styles.swiper}>
        {authors.map((author) => (
          <SwiperSlide key={author.id}>
            <div
              className={styles.authorCard}
              onClick={() => navigate(`/author/${author.id}`)}>
              <div className={styles.authorImage}>
                <img
                  src={author.photo || "/default-author.jpg"}
                  alt={author.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300/cccccc/ffffff?text=Фото+автора";
                  }}
                />
              </div>

              <div className={styles.authorInfo}>
                <h3>{author.name}</h3>
                <p className={styles.nationality}>{author.nationality}</p>
                <p className={styles.birthDate}>📅 {author.birthDate}</p>

                {author.genres?.length > 0 && (
                  <div className={styles.genres}>
                    {author.genres.map((genre, index) => (
                      <span key={index} className={styles.genreTag}>
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
