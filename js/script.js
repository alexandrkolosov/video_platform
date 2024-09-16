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

//function of spinner 

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}

//Popular Films 

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

// Display Movie Details 

async function displayMovieDetails() {
    const movieID = window.location.search.split('=')[1];

    const movie = await fetchAPIData(`movie/${movieID}`);

    const div = document.createElement('div');

    div.innerHTML = `<div class="details-top">
          <div>
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />
          </div>
          <div>
            <h2>Movie Title</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              8 / 10
            </p>
            <p class="text-muted">Release Date: XX/XX/XXXX</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              atque molestiae error debitis provident dolore hic odit, impedit
              sint, voluptatum consectetur assumenda expedita perferendis
              obcaecati veritatis voluptatibus. Voluptatum repellat suscipit,
              quae molestiae cupiditate modi libero dolorem commodi obcaecati!
              Ratione quia corporis recusandae delectus perspiciatis consequatur
              ipsam. Cumque omnis ad recusandae.
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              <li>Genre 1</li>
              <li>Genre 2</li>
              <li>Genre 3</li>
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $1,000,000</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div>`;
        document.querySelector('#movie-details').appendChild(div);
}

//Fetch data from TMDB API

async function fetchAPIData(endpoint) {
    const API_KEY = '17287986897715e01bf612f98567e799';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    hideSpinner();

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
            displayMovieDetails();
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