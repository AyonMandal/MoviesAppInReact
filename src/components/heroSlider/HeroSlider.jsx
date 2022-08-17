import React, { useEffect, useState } from "react";
import "./HeroSlider.scss";
/* import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper"; */
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbAPI, {
  category,
  movieType,
  tvShowType,
} from "../../api/tmdbApiConfig";
import apiConfig from "../../api/apiConfig";

const HeroSlider = () => {
  // SwiperCore.use([Autoplay]);
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbAPI.getMoviesList(movieType.popular, {
          params,
        });
        console.log(response);
        setMovieList(response.results.slice(1, 4));
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero__slide">
      <Swiper grabCursor={true} spaceBetween={0} slidesPerView={1}>
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
