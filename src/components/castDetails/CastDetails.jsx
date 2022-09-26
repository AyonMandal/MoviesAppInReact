import React, { useState, useEffect, useCallback } from "react";
import tmdbAPI from "./../../api/tmdbApiConfig";
import apiConfig from "../../api/apiConfig";
import "./CastDetails.scss";

const CastDetails = (props) => {
  const [Casts, setCasts] = useState([]);
  const fetchCastDetails = useCallback(async () => {
    const params = {};
    const response = await tmdbAPI.getCredits(props.category, props.id, {
      params,
    });
    console.log(response.cast);
    return response;
  }, [props.category, props.id]);

  useEffect(() => {
    (async () => {
      const castsList = await fetchCastDetails();
      setCasts(castsList.cast);
    })();
  }, [fetchCastDetails]);

  return (
    <>
      <div className="castdetails__container">
        {Casts.map((cast, i) => (
          <>
            <div className="castdetail__container">
              <div className="castdetail">
                <img
                  src={apiConfig.w500Image(cast.profile_path)}
                  alt=""
                  className="castdetail__image"
                />
              </div>
              <div className="castdetail__name">{cast.name.split(" ")[0]}</div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default CastDetails;
