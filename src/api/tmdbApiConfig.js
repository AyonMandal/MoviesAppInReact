import axiosClient from "./axiosConfig";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  top_rated: "top_rated",
  popular: "popular",
  now_playing: "now_playing",
  latest: "latest",
};

export const tvShowType = {
  top_rated: "top_rated",
  popular: "popular",
  on_the_air: "on_the_air",
  airing_today: "airing_today",
  latest: "latest",
};

const tmdbAPI = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },

  getTvSeriesList: (type, params) => {
    const url = "tv/" + tvShowType[type];
    return axiosClient.get(url, params);
  },

  getVideos: (show_category, id, params) => {
    const url = category[show_category] + "/" + id + "/videos";
    return axiosClient.get(url, params);
  },

  getSearchContent: (show_category, params) => {
    const url = "search/" + category[show_category];
    return axiosClient.get(url, params);
  },

  getDetails: (show_category, id, params) => {
    const url = category[show_category] + "/" + id;
    return axiosClient.get(url, params);
  },

  getCredits: (show_category, id, params) => {
    const url = category[show_category] + "/" + id + "/credits";
    return axiosClient.get(url, params);
  },

  getSimilarContents: (show_category, id, params) => {
    const url = category[show_category] + "/" + id + "/similar";
    return axiosClient.get(url, params);
  },
};

export default tmdbAPI;
