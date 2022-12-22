const authController = require('../controllers/authController')
const express = require('express')

// Custom Middlewares
const dashboardMiddleware = require('../customMiddlewares/dashboardMiddleware')

const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router()

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('  Please Enter Your Name  '),
        body('email').isEmail().withMessage('  Please Enter Your Email!  ').custom((userMail) => {
            User.findOne({email: userMail}).then((user) => {
                if(user){
                    return Promise.reject('  This email is already exist!  ')
                }
            })
        }),
        body('password').not().isEmpty().withMessage('  Please Enter a Password  '),
    ],
    authController.createUser)

router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logout)
router.route('/dashboard').get(dashboardMiddleware, authController.getDashboardPage)

module.exports = router