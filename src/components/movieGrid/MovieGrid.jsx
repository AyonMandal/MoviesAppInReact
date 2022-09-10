import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { category, movieType, tvShowType } from "../../api/tmdbApiConfig";
import tmdbAPI from "../../api/tmdbApiConfig";
import MovieCard from "../movieCard/MovieCard";
import { OutlineButton } from "../button/Button";

import "./MovieGrid.scss";

const MovieGrid = (props) => {
  const [Items, setItems] = useState([]);
  const [TotalPages, setTotalPages] = useState(0);
  const [CurrentPage, setCurrentPage] = useState();
  const { keyword } = useParams();

  useEffect(() => {
    const getItemsList = async (keyWord, Category) => {
      let response = null;
      const params = {};
      if (keyWord === undefined) {
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
          include_adult: false,
        };

        response = await tmdbAPI.getSearchContent(Category, params);
      }
      console.log(response);
      setItems(response.results);
      setTotalPages(response.total_pages);
      setCurrentPage(response.page);
    };
    getItemsList(keyword, props.category);
  }, [props.category, keyword]);

  const loadMoreContent = async (keyWord, Category) => {
    let response = null;
    if (keyWord === undefined) {
      const params = {
        include_adult: false,
        page: CurrentPage + 1,
      };
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
        include_adult: false,
        page: CurrentPage + 1,
      };

      response = await tmdbAPI.getSearchContent(Category, params);
    }
    console.log(response);
    setItems([...Items, ...response.results]);
    setCurrentPage(response.page);
  };

  return (
    <>
      <div className="movie-grid">
        {Items.map((item, i) => (
          <MovieCard category={props.category} key={i} item={item} />
        ))}
      </div>
      {CurrentPage < TotalPages ? (
        <div className="movie-grid__loadMore">
          <OutlineButton
            className="small"
            onClick={() => loadMoreContent(keyword, props.category)}
          >
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
