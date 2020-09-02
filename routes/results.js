const express = require('express')
const router = express()
const request = require('request')
const env = require('../config/env')

router.get('/', (req, res) => {
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

module.exports = router
