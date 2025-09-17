import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ImageSwiper = () => {
  const params = {
    modules: [Pagination, Navigation, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      clickable: true,
    },
    navigation: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };

  const images = [
    "https://eksmo.ru/upload/indextopbanners/446/xk59jcx5wqohbc9pyeisykxsggoebvd4/ispytaniestrakhom.webp",
    "https://eksmo.ru/upload/indextopbanners/ceb/ip8k5qdiw67duao18kcvqee5zrtsxkd2/kudri.webp",
    "https://eksmo.ru/upload/indextopbanners/9c5/dclcd3jpnj7b1wtrmyyy84nciujlgbs8/lisynestroyat.webp",
    "https://eksmo.ru/upload/indextopbanners/1d8/r9ppugmk38gwfg1346bqj9utpuonotyk/padenieklana.webp",
    "https://eksmo.ru/upload/indextopbanners/087/z61s80um8pl1cqgev13506pa3xftyif3/sdd.webp",
    "https://eksmo.ru/upload/indextopbanners/93e/mbpul74au0kiu1u5jrmfa9oasicpj560/skazki.webp",
  ];

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <Swiper {...params}>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Слайд ${index + 1}`}
              style={{ width: "100%", height: "auto",borderRadius: "20px", opacity: "0.8" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
