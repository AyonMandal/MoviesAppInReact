import React, { useCallback, useEffect, useRef, useState } from "react";
import tmdbAPI from "./../../api/tmdbApiConfig";
import "./VideoLists.scss";

const VideoLists = (props) => {
  const [videos, setVideos] = useState([]);
  const fetchVideosList = useCallback(async () => {
    const params = {};
    const response = await tmdbAPI.getVideos(props.category, props.id, {
      params,
    });
    console.log(response);
    return response;
  }, [props.category, props.id]);

  useEffect(() => {
    (async () => {
      const videoResponse = await fetchVideosList();
      setVideos(videoResponse.results);
    })();
  }, [fetchVideosList]);

  return (
    <>
      <dic className="video__container">
        {videos.map((item, i) => (
          <Video item={item} key={i} />
        ))}
      </dic>
    </>
  );
};

const Video = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);
  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 2) / 3 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
    </div>
  );
};
export default VideoLists;
