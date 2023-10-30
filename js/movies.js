import { getMoviesData, getGenreListData, getMoviedCountByGenre } from "./fetch-api-data.js";


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
