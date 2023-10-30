import { getData, BASE_URL } from "./fetch-api.js";

import { getURL } from "./fetch-util.js";

const ENDPOINTS = {
  GENRE_LIST: "genre/movie/list",
  MOVIES: "discover/movie",
};

export async function getGenreListData() {
  const url = getURL(ENDPOINTS.GENRE_LIST, { language: "en" });
  console.log(url)
  const data = await getData(url);
  return data.genres != null && Array.isArray(data.genres) ? data.genres : null;
}

export async function getMoviedCountByGenre() {
  const genres = await getGenreListData();
  const results = {};

  for (let genre of genres) {
    const moviesData = await getMoviesData({ with_genres: genre.id });
    results[genre.name] = moviesData.total_results;
  }
  console.log(results)
  return results;
}

export async function getMoviesData(options) {
  const url = getURL(ENDPOINTS.MOVIES, {
    include_adult: false,
    include_video: false,
    language: "en",
    ...options,
  });

  return await getData(url);
}

export async function getMovieReviews(id, options = {}) {
  const url = getURL(`movie/${id}/reviews`, {
    language: "en-US",
    page: 1,
    ...options,
  });
  return await getData(url);
}

export async function getMovieDetails(id) {
  const url = getURL(`movie/${id}`);
  return await getData(url);
}
