import axiosClient from "./axiosConfig";

export const category = {
    'movie': 'movie',
    'tv': 'tv'
}

export const movieType = {
    'upcoming': 'upcoming',
    'top rated': 'top_rated',
    'popular': 'popular',
    'now playing': 'now_playing',
    'latest': 'latest'
}

export const tvShowType = {
    'top rated': 'top_rated',
    'popular': 'popular',
    'on the air': 'on_the_air',
    'airing today': 'airing_today',
    'latest': 'latest'
}

const tmdbAPI = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type]
        return axiosClient.get(url, params)
    },

    getTvSeriesList: (type, params) => {
        const url = 'tv/' + tvShowType[type]
        return axiosClient.get(url, params)
    },

    getVideos: (show_category, id, params) => {
        const url = category[show_category] + '/' + id + '/videos'
        return axiosClient.get(url, params)
    },

    searchContent: (show_category, params) => {
        const url = 'search/' + category[show_category]
        return axiosClient.get(url, params)

    },

    getDetails: (show_category, id, params) => {
        const url = category[show_category] + '/' + id
        return axiosClient.get(url, params)
    },

    getCredits: (show_category, id, params) => {
        const url = category[show_category] + '/' + id + '/credits'
        return axiosClient.get(url, params)
    },

    getSimilarContents: (show_category, id, params) => {
        const url = category[show_category] + '/' + id + '/similar'
        return axiosClient.get(url, params)
    },


}

export default tmdbAPI;