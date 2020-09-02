const express = require('express')
const router = express()

//home page route
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Movie Data',
        name: 'Maria D. Campbell',
        message: 'Get Movie Data',
    })
})

module.exports = router
