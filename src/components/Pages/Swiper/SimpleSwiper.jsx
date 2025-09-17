import React from "react";
// Правильный импорт для новых версий Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const SimpleSwiper = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Простой свайпер</h2>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}>
        <SwiperSlide>
          <div
            style={{
              background: "#ff9999",
              padding: "40px",
              textAlign: "center",
              borderRadius: "8px",
              color: "white",
              fontSize: "20px",
            }}>
            Слайд 1
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              background: "#99ff99",
              padding: "40px",
              textAlign: "center",
              borderRadius: "8px",
              color: "white",
              fontSize: "20px",
            }}>
            Слайд 2
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              background: "#9999ff",
              padding: "40px",
              textAlign: "center",
              borderRadius: "8px",
              color: "white",
              fontSize: "20px",
            }}>
            Слайд 3
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              background: "#ffcc99",
              padding: "40px",
              textAlign: "center",
              borderRadius: "8px",
              color: "white",
              fontSize: "20px",
            }}>
            Слайд 4
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SimpleSwiper;
