// https://www.npmjs.com/package/request

// Request is designed to be the simplest way possible to make http calls.
// It supports HTTPS and follows redirects by default.

const request = require('request')
const http = require('http')
const port = process.env.PORT || 3000
const env = require('./config/env')

const movies = [
    'shawshank redemption',
    'reds',
    'titanic',
    'the sting',
    'poltergeist',
    'sunset boulevard',
    'scream',
    'rear window',
    'all about eve',
    'the birds',
]

function getMovies(arr) {
    for (let i = 0; i < arr.length; i++) {
        request(
            `https://www.omdbapi.com/?apikey=${env.API_KEY}&t=${movies[i]}`,
            function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    movies[i] = JSON.parse(body)
                    const actors = JSON.parse(body)['Actors']
                    const releaseDate = JSON.parse(body)['Released']
                    const year = JSON.parse(body)['Year']
                    const poster = JSON.parse(body)['Poster']
                    console.log(releaseDate)
                    console.log(movies[i])
                }
            }
        )
    }
}

// we pass the body or data as myRequest to http servers
// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    movies.map((movie, i) => {
        let poster = movies[i]['Poster']
        res.write(
            `<div id="movie-container" style="margin: 0 auto; text-align: center"><img src=${poster}>`
        )
        res.write(`<br><h1>${movies[i]['Title']}</h1>`)
        res.write(`<p><b>Release Date:</b> ${movies[i]['Year']}</p>`)
        res.write(`<p><b>Actors:</b>  ${movies[i]['Actors']}</p></div>`)
    })
    res.end()
}).listen(8080, function () {
    console.log('Server has started ...')
})

getMovies(movies)
