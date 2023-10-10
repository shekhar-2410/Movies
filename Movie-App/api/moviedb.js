import axios from "axios";
import { apiKey } from "../constants/index";

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;
// Constants
const API_BASE_URL = "https://api.themoviedb.org/3";
const TRENDING_MOVIE_ENDPOINT = `${API_BASE_URL}/trending/movie/day`;
const UPCOMING_MOVIE_ENDPOINT = `${API_BASE_URL}/movie/upcoming`;
const TOP_RATED_MOVIE_ENDPOINT = `${API_BASE_URL}/movie/top_rated`;
const SEARCH_MOVIE_ENDPOINT = `${API_BASE_URL}/search/movie`;
// dynamic endpoint
const MOVIE_DETAILS_ENDPOINT = (id) => `${API_BASE_URL}/movie/${id}`;
const MOVIE_CREDIT_ENDPOINT = (id) => `${API_BASE_URL}/movie/${id}/credits`;
const SIMILAR_MOVIE_ENDPOINT = (id) => `${API_BASE_URL}/movie/${id}/similar`;
const PERSON_DETAILS_ENDPOINT = (id) => `${API_BASE_URL}/person/${id}`;
const PERSON_MOVIE_ENDPOINT = (id) =>
  `${API_BASE_URL}/person/${id}/movie_credits`;
// Axios instance with common configuration (e.g., base URL and headers)
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: apiKey,
  },
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWVhZjhlYTYyOTI0NzQzMjhiODU2ZjczMzRiMzgzZCIsInN1YiI6IjY1MjNkMmM4NzQ1MDdkMDExYzEzMWU4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Klap6g30BCM8bO-1ZCxGEaUvZvdseo4CD3arDgLOAA`, // Replace with your actual access token
    Accept: "application/json",
  },
});
// API call function
const apiCall = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return {}; // Return an empty object or handle the error as needed
  }
};

// Export functions to fetch movie data
export const fetchTrendingMovie = () => {
  return apiCall(TRENDING_MOVIE_ENDPOINT);
};

export const fetchUpcomingMovie = () => {
  return apiCall(UPCOMING_MOVIE_ENDPOINT);
};

export const fetchTopRatedMovie = () => {
  return apiCall(TOP_RATED_MOVIE_ENDPOINT);
};
export const fetchDetailedMovie = (id) => {
  return apiCall(MOVIE_DETAILS_ENDPOINT(id));
};

export const fetchCreditMovie = (id) => {
  return apiCall(MOVIE_CREDIT_ENDPOINT(id));
};

export const fetchSimilarMovie = (id) => {
  return apiCall(SIMILAR_MOVIE_ENDPOINT(id));
};
export const fetchPersonDeatils = (id) => {
  return apiCall(PERSON_DETAILS_ENDPOINT(id));
};

export const fetchPersonMovie = (id) => {
  return apiCall(PERSON_MOVIE_ENDPOINT(id));
};

export const fetchSearchMovie = (params) => {
  return apiCall(SEARCH_MOVIE_ENDPOINT, params);
};
