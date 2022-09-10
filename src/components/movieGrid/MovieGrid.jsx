import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { category, movieType, tvShowType } from "../../api/tmdbApiConfig";
import tmdbAPI from "../../api/tmdbApiConfig";
import MovieCard from "../movieCard/MovieCard";
import { OutlineButton } from "../button/Button";
import InputSearchBar from "../inputSearchBar/InputSearchBar";

import "./MovieGrid.scss";

const MovieGrid = (props) => {
  const [Items, setItems] = useState([]);
  const [TotalPages, setTotalPages] = useState(0);
  const [CurrentPage, setCurrentPage] = useState();
  const { keyword } = useParams();

  useEffect(() => {
    const getItemsList = async () => {
      let response = null;
      const params = {};
      if (keyword === undefined) {
        switch (props.category) {
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
          query: keyword,
        };

        response = await tmdbAPI.getSearchContent(props.category, { params });
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

      response = await tmdbAPI.getSearchContent(Category, { params });
    }
    console.log(response);
    setItems([...Items, ...response.results]);
    setCurrentPage(response.page);
  };

  return (
    <>
      <div className="section mb-3">
        <ContentSearch category={props.category} SearchContent={keyword} />
      </div>
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

const ContentSearch = (props) => {
  const [SearchContent, setSearchContent] = useState(
    props.SearchContent ? props.SearchContent : ""
  );
  let navigate = useNavigate();

  const startContentSearch = useCallback(() => {
    if (SearchContent.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${SearchContent}`);
    }
  }, [props.category, SearchContent, navigate]);

  useEffect(() => {
    const enterKeyPressed = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        startContentSearch();
      }
    };
    document.addEventListener("keyup", enterKeyPressed);
    return () => {
      document.removeEventListener("keyup", enterKeyPressed);
    };
  }, [SearchContent, startContentSearch]);

  return (
    <>
      <InputSearchBar
        placeholder="Search Content"
        value={SearchContent}
        onChange={(e) => setSearchContent(e.target.value)}
        onClick={startContentSearch}
      />
    </>
  );
};

export default MovieGrid;
