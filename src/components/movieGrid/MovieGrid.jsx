import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { category, movieType, tvShowType } from "../../api/tmdbApiConfig";
import tmdbAPI from "../../api/tmdbApiConfig";
import MovieCard from "../movieCard/MovieCard";

import "./MovieGrid.scss";

const MovieGrid = (props) => {
  const [Items, setItems] = useState([]);
  const { keyword } = useParams();
  useEffect(() => {
    const getItemsList = async (keyWord, Category) => {
      let response = null;
      if (keyWord === undefined) {
        const params = {};
        switch (Category) {
          case category.movie:
            response = await tmdbAPI.getMoviesList(movieType.popular, {
              params,
            });
            break;

          default:
            response = await tmdbAPI.getTvSeriesList(tvShowType.popular, {
              params,
            });
            break;
        }
      } else {
        const params = {
          query: keyWord,
        };

        response = await tmdbAPI.getSearchContent(Category, params);
      }
      console.log(response);
      setItems(response.results);
    };
    getItemsList(keyword, props.category);
  }, [props.category, keyword]);

  return (
    <>
      <div className="movie-grid">
        {Items.map((item, i) => (
          <MovieCard category={props.category} key={i} item={item} />
        ))}
      </div>
    </>
  );
};

export default MovieGrid;
