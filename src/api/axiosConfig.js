import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify(
      {
        ...params,
        api_key: apiConfig.apiKey,
      },
      { arrayFormat: "brackets" }
    ),
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    console.log(error);
    throw error;
  }
);

export default axiosClient;
