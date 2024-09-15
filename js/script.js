const global = {
    currentPage: window.location.pathname 
}

//Highlight active link

function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

//Populat Films 

async function displayPopularMovies() {
    const { results }  = await fetchAPIData('movie/popular');
    
    results.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('card');
        movieElement.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path
                ? ` <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;
    document.querySelector('#popular-movies').appendChild(movieElement)
    })
}

//Populat TV Shows

async function displayPopularTV() {
    const { results }  = await fetchAPIData('tv/popular');
    
    results.forEach((tv) => {
        const tvElement = document.createElement('div');
        tvElement.classList.add('card');
        tvElement.innerHTML = `
          <a href="tv-details.html?id=${tv.id}">
            ${tv.poster_path
                ? ` <img
              src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
              class="card-img-top"
              alt="${tv.name}"
            />` : ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${tv.name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${tv.first_air_date}</small>
            </p>
          </div>`;
    document.querySelector('#popular-shows').appendChild(tvElement)
    })
}

//Fetch data from TMDB API

async function fetchAPIData(endpoint) {
    const API_KEY = '17287986897715e01bf612f98567e799';
    const API_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
}

// Init app

function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log('Home')
            displayPopularMovies() 
            break;
        case '/shows.html':
            displayPopularTV();
            break;
        case '/movie-details.html':
            console.log('Movie Details')
            break;
        case '/tv-details.html':
            console.log('TV Details')
            break;
        case '/search.html':
            console.log('Search')
            break;
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);