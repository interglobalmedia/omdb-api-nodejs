// https://www.npmjs.com/package/request

// Request is designed to be the simplest way possible to make http calls.
// It supports HTTPS and follows redirects by default.
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const request = require('request')
const ejs = require('ejs')
const http = require('http')
const env = require('../config/env')
const getMovie = require('./utils/getMovie')

// set up static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')
// set up view engine directory
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// define path for Express config
app.use(express.static(publicDirectoryPath))
//home page route
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Movie Data',
        name: 'Maria D. Campbell',
        message: 'Get Movie Data',
    })
})
app.get('/results', function (req, res) {
    let query = req.query.search
    console.log(query)
    const url = `https://www.omdbapi.com/?s=${query}=&apikey=${env.API_KEY}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            console.log(data)
            res.render('pages/results', {
                data: data,
                title: 'Movie Search Results',
                message: `Movie Search Results`,
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port} ...`)
})
