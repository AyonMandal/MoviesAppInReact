import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.scss";
import tmdbAPI from "../../api/tmdbApiConfig";
import apiConfig from "../../api/apiConfig";
import CastDetails from "../../components/castDetails/CastDetails";

const Detail = () => {
  const { category, id } = useParams();
  const [contentDetail, setContentDetail] = useState(null);
  useEffect(() => {
    const getContentDetails = async () => {
      const params = {};
      const response = await tmdbAPI.getDetails(category, id, { params });
      setContentDetail(response);
      window.scrollTo(0, 0);
    };
    getContentDetails();
  }, [category, id]);

  return (
    <>
      {contentDetail && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                contentDetail.backdrop_path || contentDetail.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <img
                src={apiConfig.w500Image(contentDetail.poster_path)}
                alt="Poster"
              />
            </div>
            <div className="movie-content__info">
              <h1 className="movie-content__info__title">
                {contentDetail.title || contentDetail.name}
              </h1>
              <div className="movie-content__info__genres">
                {contentDetail.genres &&
                  contentDetail.genres.slice(0, 5).map((genre, i) => (
                    <>
                      <span className="movie-content__info__genre" key={i}>
                        {genre.name}
                      </span>
                    </>
                  ))}
              </div>
              <div className="movie-content__info__overview">
                {contentDetail.overview}
              </div>
              <CastDetails category={category} id={id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;

//:category/:id
