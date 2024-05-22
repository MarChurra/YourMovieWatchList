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
    console.log(userQuery)

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
    console.log(movies)
    movies.forEach(function (movie) {
        console.log(movie)
        movieID = movie.id

        fetch(`https://api.themoviedb.org/3/movie/${movieID}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let listHTML = ''
                const moviesListEl = document.getElementById('moviesListEl')
                listHTML +=
                    `
                    <img src=${movie.poster_path}>
                    <button><span></span>Add to Watchlist</button>
                    <h2>${movie.title}</h2>
                    <p>${movie.runtime}</p>
                    <p>${movie.genres}</p>
                    <p>${movie.vote_average}</p>
                    <p>${movie.overview}</p>
                    `
                    moviesListEl.innerHTML = listHTML
            })
            .catch(err => console.error(err));
    })
}


searchBtn.addEventListener('click', searchMovie)




