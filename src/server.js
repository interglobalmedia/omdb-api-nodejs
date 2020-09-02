// https://www.npmjs.com/package/request

// Request is designed to be the simplest way possible to make http calls.
// It supports HTTPS and follows redirects by default.
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const logger = require('morgan')
const errorHandler = require('errorhandler')
const env = require('../config/env')
const ejs = require('ejs')
const routes = require('../routes/index')
const results = require('../routes/results')

// set up static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')
// set up view engine directory
const viewsPath = path.join(__dirname, '../views')

app.set('views', viewsPath)
app.set('view engine', 'ejs')

app.use(logger('combined'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// define path for Express config
app.use(express.static(publicDirectoryPath))

//home page route
app.use('/', routes)
// results route
app.use('/results', results)
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
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.render('error', {
        title: `Error Page`,
        message: `No search results. Try again!`,
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port} ...`)
})
