const apiConfig = {
    baseURL: 'https://api.themoviedb.org/3/',
    apiKey: 'b1ff4dcf9d0095ae01b06cb507566dbf',
    originalImage: (imagePath) => `https://image.tmdb.org/t/p/original/${imagePath}`,
    w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500/${imagePath}`
}

export default apiConfig;