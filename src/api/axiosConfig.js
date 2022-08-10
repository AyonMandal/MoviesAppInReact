import axios from "axios";
import "query-string"
import {
    stringify
} from "query-string";

import apiConfig from "./apiconfig";

const axiosClient = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
        'Content-type': 'application/json'
    },
    paramsSerializer: params => stringify({
        ...params,
        api_key: apiConfig.apiKey
    })
})

axiosClient.interceptors.request.use(async (config) => config)

axiosClient.interceptors.response.use(response => {
    if (response && response.data) {
        return response.data
    }

    return response
}, (error) => {
    console.log(error)
    throw error;
})
// some code in branch 1

export default axiosClient;