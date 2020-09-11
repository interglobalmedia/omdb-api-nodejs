const express = require('express')
const router = express.Router()
const got = require('got')
const env = require('../config/env')

router.get('/', async (req, res) => {
    let query = req.query.search
    let page = +req.query.page || 1
    console.log(query)
    const itemsPerPage = 10
    let totalItems
    const url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${env.API_KEY}`
    try {
        const response = await got(url)

        console.log(response.body)
        const data = JSON.parse(response.body)
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
    } catch (error) {
        console.log(error.urlResponse.body)
    }
})

module.exports = router
