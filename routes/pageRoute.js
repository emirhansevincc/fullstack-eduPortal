const pageController = require('../controllers/pageController')
const express = require('express')

const router = express.Router()

// Custom Middlewares
const ifLoggedIn = require('../customMiddlewares//ifLoggedIn')

router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(ifLoggedIn, pageController.getRegisterPage)
router.route('/login').get(ifLoggedIn, pageController.getLoginPage)

module.exports = router