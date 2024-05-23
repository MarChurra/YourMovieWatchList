let returnedMovies = []
let movieID = ""

const options = {
    method: 'GET', headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjhkMjhmMmNmZmNhMWJlOWIyZjYwNjAyY2QyZGJlYyIsInN1YiI6IjY2NGRhZjE2ZWIwNTU4ZTk2MjEzZjM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yVufbNxxcut3wE9I_BI0c8K5l3hz1fDxu8YpszX4gwI'
    }
}

const searchBtn = document.getElementById('searchBtn')
const searchBar = document.getElementById('searchBar')

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
})

searchBar.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        searchBtn.click()
    }
})

function searchMovie() {
    const userQuery = searchBar.value.trim()
    moviesListEl.innerHTML = ""

    if (!userQuery) {
        window.alert("Please enter something into the search bar")
    }

    fetch(`https://api.themoviedb.org/3/search/movie?query=${userQuery}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(data => {
            let returnedMovies = data.results
            renderMoviesList(returnedMovies)
        })
        .catch(err => console.error(err));
}

function renderMoviesList(movies) {
    movies.forEach(function (movie) {
        const movieID = movie.id

        fetch(`https://api.themoviedb.org/3/movie/${movieID}`, options)
            .then(response => response.json())
            .then(data => {
                let listHTML = ''
                const moviesListEl = document.getElementById('moviesListEl')
                listHTML +=
                    `
                <div class = "movie-wrapper container">
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title} poster">
                    <h2 class ="movie-title" >${data.title}</h2>
                    <div class ="movie-details">
                    <p class ="movie-runtime" >${data.runtime} minutes</p>
                    <p class="movie-genres" >${data.genres.map(genre => genre.name).join(',  ')}</p>
                    <img id="addToWatchListBtn"src="/images/plus.png"><span>Watchlist</span>
                    </div>
                    <div class="movie-score">
                    <img src ="/images/star.png">
                    <span>${data.vote_average}</span>
                    </div>
                    <p class= "movie-overview">${data.overview}</p>
                </div>
                    `
                moviesListEl.innerHTML += listHTML
            })
            .catch(err => console.error(err));
    })
}


searchBtn.addEventListener('click', searchMovie)




