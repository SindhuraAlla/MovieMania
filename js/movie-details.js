import { getMovieReviews, getMovieDetails } from "./fetch-api-data.js";

async function renderMovieOverview(id) {
  const movieOverviewSection = document.getElementById(
    "movieOverviewSection"
  );

  if (id != null) {
    const movie = await getMovieDetails(id);

    movieOverviewSection.innerHTML = `<div class="row pt-2">
        <div class="col-sm-3">
          <div class="image-container">
            <img
              class="poster lazyload lazyloaded fit-parent"
              src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}"
              alt=${movie.title}
            />
          </div>
        </div>
        <div class="col-sm-9">
          <div class="row">
            <div class="col movie-overview-title text-warning h1">${movie.title}</div>
          </div>
          <div class="row text-white">
            <div class="col movie-overview-details h5">${movie.overview}</div>
          </div>
          <div class="row text-white py-1">
            <div class="col-2">Release Date: ${movie.release_date}</div>
            <div class="col-2">Runtime: ${movie.runtime} Minutes</div>
          </div>
          <div class="row text-white py-1">
            <div class="col-2">IMDB Ratings: ${movie.vote_average}</div>
          </div>
          <div class="row text-white py-1">
            <div class="col">Home Page: <a href=${movie.homepage}>${movie.homepage}</a></div>
          </div>
        </div>
      </div>`;
  } else {
    movieOverviewSection.innerHTML = `<div class="row pt-2 text-white">
      <p><strong> Please visit <a href="/movies.html" class="text-warning">Movies</a> page to select a movie for details</strong></p>
    </div>`
  }
}

(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  renderReviews(id);
  renderMovieOverview(id);
})();

