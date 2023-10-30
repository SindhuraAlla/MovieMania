import { getMoviesData, getGenreListData, getMoviedCountByGenre } from "./fetch-api-data.js";

async function renderMoviesTableBody() {
  const with_genres = document
    .getElementById("genreDropdownMenuSelected")
    .getAttribute("data-genreDropdownMenuSelected");
  const sort_by = document
    .getElementById("sortDropdownMenuSelected")
    .getAttribute("data-sortDropdownMenuSelected");

  const data = await getMoviesData({ sort_by, with_genres });
  const movies = data?.results ?? [];

  const moviesTableBody = document.getElementById("moviesTableBody");

  let counter = 1;

  const rows = movies.reduce((rows, movie) => {
    rows.push(
      `<tr>
        <th scope="row">${counter}</th>
        <td>${movie.original_title}</td>
        <td>
          <a href="movie_details.html?id=${movie.id}" class="link-underline-light">
            <span class="icon-color">&#128279</span>
          </a>
        </td>
        <td>${movie.vote_average}</td>
        <td>${movie.vote_count}</td>
        <td>${movie.release_date}</td>
      </tr>
    `
    );
    counter++;
    return rows;
  }, []);

  moviesTableBody.innerHTML = rows.join(" ");
}

function onGenreChange(name, id) {
  const element = document.getElementById("genreDropdownMenuSelected");
  element.innerText = name;
  element.setAttribute("data-genreDropdownMenuSelected", id);

  renderMoviesTableBody();
}

async function renderDropDownSource() {
  const dropdownMenuSource = document.getElementById("genreDropdownMenuSource");

  const genres = (await getGenreListData()) ?? [];

  for (const genre of genres) {
    const element = document.createElement("button");
    element.classList.add("dropdown-item");
    element.appendChild(document.createTextNode(genre.name));
    dropdownMenuSource.appendChild(element);
    element.onclick = function () {
      onGenreChange(genre.name, genre.id);
    };
  }
}

const SORT_ELEMENTS_INNER_HTML = {
  "popularity.desc": `Rating <span class="sort-icon-color">&#8593;</span>`,
  "popularity.asc": `Rating <span class="sort-icon-color">&#8595;</span>`,
  "votes.desc": `Votes <span class="sort-icon-color">&#8593;</span>`,
  "votes.asc": `Votes <span class="sort-icon-color">&#8595;</span>`,
  "primary_release_date.desc": `Release Date <span class="sort-icon-color">&#8593;</span>`,
  "primary_release_date.asc": `Release Date <span class="sort-icon-color">&#8595;</span>`,
};

function onSortChange(value) {
  const element = document.getElementById("sortDropdownMenuSelected");
  element.innerHTML = SORT_ELEMENTS_INNER_HTML[value] ?? "";
  element.setAttribute("data-sortDropdownMenuSelected", value);

  renderMoviesTableBody();
}

function renderSortDropdownMenuSource() {
  const dropdownMenuSource = document.getElementById("sortDropdownMenuSource");

  const sortables = Object.entries(SORT_ELEMENTS_INNER_HTML);

  for (const [sort_by, innerHtml] of sortables) {
    const element = document.createElement("button");
    element.classList.add("dropdown-item");
    element.innerHTML = innerHtml;
    dropdownMenuSource.appendChild(element);
    element.onclick = function () {
      onSortChange(sort_by);
    };
  }
}

(function () {
  renderDropDownSource();
  renderSortDropdownMenuSource();
  renderMoviesTableBody();
})();


function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.2)`;
}

function getRandomBorderColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

function generateColors(size) {
  return Array.from({ length: size }, getRandomColor);
}

function generateBorderColors(size) {
  return Array.from({ length: size }, getRandomBorderColor);
}

function renderChart(chartType, data) {
  const ctx = document.getElementById('genre-count-chart').getContext('2d');
  const labels = Object.keys(data);
  const counts = Object.values(data);
  
  const colors = generateColors(labels.length);
  const borderColors = generateBorderColors(labels.length);

  const chart = new Chart(ctx, {
      type: chartType,
      data: {
          labels: labels,
          datasets: [{
              label: '# of Movies By Genre',
              data: counts,
              backgroundColor: colors,
              borderColor: borderColors,
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
                beginAtZero: chartType === 'bar',
                ticks: {
                    color: '#FFC106'
                },
                grid: {
                    display: false
                }
            },
            x: {
                ticks: {
                    color: '#FFC106'
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#FFC106',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
      }
  });
}

getMoviedCountByGenre().then(data => {
  renderChart('bar', data);
});
