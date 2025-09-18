import { BookWorm } from "./BookWorm/BookWorm";
import { Citation } from "./Citation/CItation";
import { Home } from "./Home/Home";
import ImageSwiper from "../Swiper/ImageSwiper";
import Library from "./LIbrary/Library";

export function HomePaje() {
  return (
    <div>
      <Home />
      <Citation />
      <BookWorm />
      <ImageSwiper/>
      <Library/>
    </div>
  );
}
