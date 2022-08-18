import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Button, { OutlineButton } from "../button/Button";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./HeroSlider.scss";

import tmdbAPI, {
  category,
  movieType,
  tvShowType,
} from "../../api/tmdbApiConfig";
import apiConfig from "../../api/apiConfig";

const HeroSlider = () => {
  SwiperCore.use([Autoplay, Pagination]);
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    async function getMovies() {
      const params = { page: 1 };
      try {
        const response = await tmdbAPI.getMoviesList(movieType.popular, {
          params,
        });
        console.log(response);
        setMovieList(response.results.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  }, []);

  return (
    <div className="hero__slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        pagination={true}
        autoplay={{ delay: 5000 }}
      >
        {movieList.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = (props) => {
  let navigate = useNavigate();
  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className={`hero-slide__item ${props.className}`}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate("/movie/" + item.id)}>
              Watch Now
            </Button>
            <OutlineButton>Watch Later</OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="Poster" />
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
