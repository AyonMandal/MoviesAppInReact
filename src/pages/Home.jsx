import React from "react";
import { Link } from "react-router-dom";
import { category, movieType } from "../api/tmdbApiConfig";
import { OutlineButton } from "../components/button/Button";
import HeroSlider from "../components/heroSlider/HeroSlider";
import MovieList from "../components/movieList/MovieList";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <div className="conatiner">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV Series</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV Series</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={movieType.top_rated} />
        </div>
      </div>
    </>
  );
};

export default Home;
