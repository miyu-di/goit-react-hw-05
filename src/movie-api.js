import axios from "axios";

axios.defaults.baseURL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWEwODYwYzc4ZGM5ZGY5M2EzYmRiOTI4Y2M3MTg0MiIsInN1YiI6IjY1ZjlmNWZiNzA2YjlmMDE3ZGQzYzgyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zx7uJDCLMCrWYSIu-m6V70Q6uMxX-_IgTVMfonYN9Fw",
  },
};

export const getTrending = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US", options
    );
    return response.data.results;
}

export const getMovieDetailsById = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const getCredits = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options
  );
  return response.data.cast;
}

export const getReviews = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, options
  );
  return response.data.results;
}

export const getMovieByQuery = async (query) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      ...options,
      params: {
        query: query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    }
  );
  return response.data.results;
}