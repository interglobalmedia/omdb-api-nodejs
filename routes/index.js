const express = require('express')
const router = express.Router()

//home page route
router.get('/', async (req, res) => {
    try {
        return await res.render('index', {
            title: 'Movie Data',
            name: 'Maria D. Campbell',
            message: 'Get Movie Data',
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
