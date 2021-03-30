const path = require('path')
const express = require('express')
const app = express()
const logger = require('morgan')
const errorHandler = require('errorhandler')
const routes = require('../routes/index')
const results = require('../routes/results')

const node_env = process.env.NODE_ENV || 'development'

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
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	if (node_env === 'development') {
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
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.render('error', {
		title: `Error Page`,
		message: `No search results. Try again!`,
	})
})

app.listen(process.env.PORT || 8080)
