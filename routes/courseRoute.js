const courseController = require('../controllers/courseController')
const express = require('express')

const userRoleMiddleware = require('../customMiddlewares/userRoleMiddleware')

const router = express.Router()

router.route('/').post(userRoleMiddleware(['teacher', 'admin']), courseController.createCourse)
router.route('/').get(courseController.getAllCourses)
router.route('/:slug').get(courseController.getCourse)
router.route('/enroll').post(courseController.enrollCourse)
router.route('/release').post(courseController.releaseCourse)
router.route('/:slug').delete(courseController.deleteCourse)

module.exports = router