import React, { useEffect, useRef, useState } from "react";
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
import Modal, { ModelContent } from "../modal/Modal";

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
        setMovieList(response.results.slice(0, 9));
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
        autoplay={{ delay: 8000 }}
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
      {movieList.map((item, i) => (
        <TrailerModel key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let navigate = useNavigate();
  const item = props.item;

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videos = await tmdbAPI.getVideos(category.movie, item.id, {
      params: {},
    });
    const trailerVideos = videos.results.filter(
      (ele) => ele.type === "Trailer"
    );
    //console.log(trailerVideos);

    if (videos.results.length > 0) {
      const srcVideo =
        trailerVideos.length > 0
          ? `https://www.youtube.com/embed/${trailerVideos[0].key}`
          : `https://www.youtube.com/embed/${videos.results[0].key}`;
      //const srcVideo = const srcVideo = `https://www.youtube.com/embed/${videos.results[0].key}`;`;
      //console.log(srcVideo);
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", srcVideo);
    } else {
      modal.querySelector(".modal__selector").innerHTML = "No Trailer";
    }

    modal.classList.toggle("active");
  };

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
            <OutlineButton onClick={setModalActive}>Watch Later</OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="Poster" />
        </div>
      </div>
    </div>
  );
};

const TrailerModel = (props) => {
  const iframeRef = useRef(null);
  const item = props.item;

  const onClose = () => {
    iframeRef.current.setAttribute("src", "");
  };

  return (
    <Modal id={`modal_${item.id}`} active={false}>
      <ModelContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModelContent>
    </Modal>
  );
};

export default HeroSlider;
