const authController = require('../controllers/authController')
const express = require('express')

// Custom Middlewares
const dashboardMiddleware = require('../customMiddlewares/dashboardMiddleware')

const router = express.Router()

router.route('/signup').post(authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logout)
router.route('/dashboard').get(dashboardMiddleware, authController.getDashboardPage)

module.exports = router