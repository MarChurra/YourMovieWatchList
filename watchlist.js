
const options = {
    method: 'GET', headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjhkMjhmMmNmZmNhMWJlOWIyZjYwNjAyY2QyZGJlYyIsInN1YiI6IjY2NGRhZjE2ZWIwNTU4ZTk2MjEzZjM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yVufbNxxcut3wE9I_BI0c8K5l3hz1fDxu8YpszX4gwI'
    }
}

const storedWatchList = localStorage.getItem("watchList")

if (storedWatchList) {
    const watchlist = JSON.parse(storedWatchList)
    renderWatchlist(watchlist)
}

function renderWatchlist(watchlist) {
    watchlist.forEach(function (movie) {

        fetch(`https://api.themoviedb.org/3/movie/${movie}`, options)
            .then(response => response.json())
            .then(data => {
                const movieId = movie.id
                let listHTML = ''
                const watchlistEl = document.getElementById('watchListMovies')
                listHTML +=
                    `
                <div class = "movie-wrapper container">
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title} poster">
                    <h2 class ="movie-title" >${data.title}</h2>
                    <div class ="movie-details">
                    <p class ="movie-runtime" >${data.runtime} minutes</p>
                    <p class="movie-genres" >${data.genres.map(genre => genre.name).join(',  ')}</p>
                    <img class="removeBtn" data-movie-id="${movieId}" src="/images/x-mark.png"><span>Remove</span>
                    </div>
                    <div class="movie-score">
                    <img src ="/images/star.png">
                    <span>${data.vote_average}</span>
                    </div>
                    <p class= "movie-overview">${data.overview}</p>
                </div>
                    `
                watchlistEl.innerHTML += listHTML
            })
            .catch(err => console.error(err));
    })
}

document.getElementById('watchListMovies').addEventListener('click', function (e) {
    if (e.target.classList.contains('removeBtn')) {
        const selectedMovie = e.target.dataset.movieId
        const index = storedWatchList.findIndex(movie => movie === selectedMovie)
        storedWatchList.slice(index, 1)
    }
})