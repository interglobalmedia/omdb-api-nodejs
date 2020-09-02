// https://www.npmjs.com/package/request

// Request is designed to be the simplest way possible to make http calls.
// It supports HTTPS and follows redirects by default.
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const request = require('request')
const logger = require('morgan')
errorHandler = require('errorhandler')
const ejs = require('ejs')
const env = require('../config/env')

// set up static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')
// set up view engine directory
const viewsPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname, '../views/partials')

app.set('views', viewsPath)
app.set('view engine', 'ejs')

app.use(logger('combined'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// define path for Express config
app.use(express.static(publicDirectoryPath))
//home page route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Movie Data',
        name: 'Maria D. Campbell',
        message: 'Get Movie Data',
    })
})
app.get('/results', function (req, res) {
    let query = req.query.search
    let page = +req.query.page || 1
    console.log(query)
    const itemsPerPage = 10
    let totalItems
    const url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${env.API_KEY}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            totalItems = data['totalResults']
            console.log(data)
            console.log(data['totalResults'])
            res.render('pages/results', {
                data: data,
                totalPages: Math.ceil(totalItems / itemsPerPage),
                title: 'Movie Search Results',
                message: `Movie Search Results`,
                query: req.query.search,
                totalItems: data['totalResults'],
            })
        }
    })
})

// error handlers

// development error handler
// will print stacktrace
if (env === 'development') {
    errorHandler.title = 'Error Page'
    app.use(errorHandler())
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: err,
        title: errorHandler.title,
    })
}

// production error handler
// no stack traces leaked to user
app.use(function (error, req, res, next) {
    res.status(error.status || 500)
    res.render('error', {
        title: `Error Page`,
        message: `No search results. Try again!`,
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port} ...`)
})
