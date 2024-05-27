let watchlist = []
const notification = document.getElementById('notification')


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

export function showNotification(message) {
    notification.textContent = message
    notification.style.visibility = 'visible'
    setTimeout(function () {
        notification.style.visibility = 'hidden'
    }, 2000)
}

function searchMovie() {
    const userQuery = searchBar.value.trim()
    searchBar.value = ""
    moviesListEl.innerHTML = ""

    if (!userQuery) {
        showNotification('Please insert something in the seach bar')
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
    const moviesListEl = document.getElementById('moviesListEl')
    if (movies.length === 0) {
        moviesListEl.innerHTML =
            `
            <div class = "error-message">
            <img src="images/film-reel.png">
            <p>No movies found</p>
            </div>
        `
        return
    }

    movies.forEach(function (movie) {
        const movieID = movie.id

        fetch(`https://api.themoviedb.org/3/movie/${movieID}`, options)
            .then(response => response.json())
            .then(data => {
                let listHTML = ` <p class="filler-text">Nothing here yet...</p>`
                const moviesListEl = document.getElementById('moviesListEl')
                listHTML =
                    `
                <div class = "movie-wrapper container">
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="Poster Unavailable">
                    <h2 class ="movie-title" >${data.title}</h2>
                    <div class ="movie-details">
                    <p class ="movie-runtime" >${data.runtime} minutes</p>
                    <p class="movie-genres" >${data.genres.map(genre => genre.name).join(',  ')}</p>
                    <img id="addToWatchListBtn" class="addToWatchListBtn" data-movie-id="${movieID}" src="/images/plus.png"><span>Watchlist</span>
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

moviesListEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('addToWatchListBtn')) {
        const movieId = e.target.dataset.movieId
        if (!watchlist.includes(movieId)) {
            watchlist.push(movieId)
            showNotification('Movie added to the watchlist')
            localStorage.setItem("watchList", JSON.stringify(watchlist));
        }
        else if (watchlist.includes(movieId)) {
            showNotification('Movie already added to the watchlist')
        }
    }
})


