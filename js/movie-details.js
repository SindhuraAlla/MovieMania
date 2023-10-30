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

async function renderReviews(id) {
  if (id != null) {
    const data = await getMovieReviews(id);
    const reviews = data.results;

    const movieReviewsSection = document.getElementById("movieReviewsSection");

    const cards = reviews.map((review) => {
      return `<div class="card bg-dark text-white">
          <div class="card-header">
          <div class="card-title">
          <span class="author-name">${review.author}</span>
          <span class="rating-star">&#11088;</span>
          <span class="rating-value">${
            review?.author_details?.rating ?? "0"
          }.0</span>
          </div> 
          <div>on ${new Date(review.created_at).toDateString()}</div>
          </div>
          <div class="card-body">
            <p class="card-text">
              ${review.content}
            </p>
          </div>
        </div>`;
    });

    const heading = `<h2 class="text-warning">Reviews</h2>`;

    movieReviewsSection.innerHTML = heading + cards.join(" ");
  }
}

(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  renderReviews(id);
  renderMovieOverview(id);
})();

