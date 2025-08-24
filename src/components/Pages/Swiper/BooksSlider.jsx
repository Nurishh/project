
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./Swiper.module.scss";

export const BooksSlider = ({ books }) => {
  return (
    <div className="books-slider-container">
      <h2>Наши книги</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="books-swiper">
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="book-card">
              <div className="book-image">
                <img src={book.image} alt={book.title} />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-category">{book.category}</p>
                <p className="book-description">
                  {book.koroche.length > 100
                    ? `${book.koroche.substring(0, 100)}...`
                    : book.koroche}
                </p>
                <button className="book-btn">Подробнее</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BooksSlider;
