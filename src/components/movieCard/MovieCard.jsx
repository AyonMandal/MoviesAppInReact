import React from "react";
import Button from "../button/Button";
import apiConfig from "../../api/apiConfig";
import { category } from "../../api/tmdbApiConfig";
import "./MovieCard.scss";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const item = props.item;
  const bg_image = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  const link = "/" + category[props.category] + "/" + item.id;
  return (
    <>
      <Link to={link}>
        <div
          className="movie-card"
          style={{ backgroundImage: `url(${bg_image})` }}
        >
          <div className="movie-summary">
            <h4>{item.title || item.name}</h4>
            <Button>Details</Button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;
