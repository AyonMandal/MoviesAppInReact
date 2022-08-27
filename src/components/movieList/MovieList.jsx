import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import tmdbAPI, { category } from "../../api/tmdbApiConfig";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./MovieList.scss";
import MovieCard from "../movieCard/MovieCard";

const MovieList = (props) => {
  const [itemList, setItemList] = useState([]);
  let response = null;

  useEffect(() => {
    const getItemsList = async () => {
      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbAPI.getMoviesList(props.type, {
              params: {},
            });
            console.log(response);
            break;

          default:
            response = await tmdbAPI.getTvSeriesList(props.type, {
              params: {},
            });
            break;
        }
      } else {
        response = tmdbAPI.getSimilarContents(props.category, props.id, {
          params: {},
        });
      }
      setItemList(response.results);
    };
    getItemsList();
  }, []);

  return (
    <>
      <div className="movie-list">
        <Swiper grabCursor={true} slidesPerView={"auto"} spaceBetween={10}>
          {itemList.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={props.category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default MovieList;
