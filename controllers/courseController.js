const Course = require('../models/Course')

exports.createCourse = async(req, res) => {
    const course = await Course.create(req.body)
    try{
        res.status(201).json({
            status: 'Success',
            course,
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            err
        })
    }
}

exports.getAllCourses = async(req, res) => {
    const courses = await Course.find()
    try{
        res.status(200).render('courses.ejs', {
            courses,
            pageName : 'courses'
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            err
        })
    }
}