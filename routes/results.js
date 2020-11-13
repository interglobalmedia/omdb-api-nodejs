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
        console.log(data)
        totalItems = data['totalResults']
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
        console.log(error.response.body)
    }
})

module.exports = router
