// https://www.npmjs.com/package/request

// Request is designed to be the simplest way possible to make http calls.
// It supports HTTPS and follows redirects by default.
const path = require('path')
const express = require('express')
const app = express()
const logger = require('morgan')
const errorHandler = require('errorhandler')
const env = require('../config/env')
const ejs = require('ejs')
const routes = require('../routes/index')
const results = require('../routes/results')
const config = require('../config/config')

console.log(`NODE_ENV=${config.NODE_ENV}`);

// set up static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')
// set up view engine directory
const viewsPath = path.join(__dirname, '../views')

app.set('views', viewsPath)
app.set('view engine', 'ejs')

app.use(logger('combined'))

// define path for Express static files config
app.use(express.static(publicDirectoryPath))

//home page route
app.use('/', routes)
// results route
app.use('/results', results)

// registration of errorhandler middleware for development
app.use(errorHandler())

// development error handler
// will print stacktrace
app.use((req, res, next) => {
    if (config.NODE_ENV === 'development') {
        errorHandler.title = 'Error Page'
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err,
            title: errorHandler.title,
        })
    }
})


// production error handler
// no stack traces leaked to user
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.render('error', {
        title: `Error Page`,
        message: `No search results. Try again!`,
    })
})

app.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT} ...`)
})
