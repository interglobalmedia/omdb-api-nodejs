const express = require('express')
const router = express.Router()
const got = require('got')
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv')
dotenv.config()

const API_KEY = process.env.API_KEY

router.get('/', async (req, res) => {
	let query = req.query.search
	let page = +req.query.page || 1
	// eslint-disable-next-line no-console
	console.log(query)
	const itemsPerPage = 10
	let totalItems
	const url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${API_KEY}`
	try {
		const response = await got(url)
		// eslint-disable-next-line no-console
		console.log(response.body)
		const data = JSON.parse(response.body)
		// eslint-disable-next-line no-console
		console.log(data)
		totalItems = data['totalResults']
		// eslint-disable-next-line no-console
		console.log(totalItems)
		res.render('pages/results', {
			data,
			totalPages: Math.ceil(totalItems / itemsPerPage),
			title: 'Movie Search Results',
			message: `Movie Search Results`,
			query,
			totalItems,
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error.response.body)
	}
})

module.exports = router
