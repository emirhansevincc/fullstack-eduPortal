const Course = require('../models/Course')
const Category = require('../models/Category')

exports.createCourse = async(req, res) => {
    try{
        const course = await Course.create(req.body)

        res.status(201).redirect('/courses')
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            err
        })
    }
}

exports.getAllCourses = async(req, res) => {

    const categoryParameter = req.query.categories
    const category = await Category.findOne({slug: categoryParameter})

    let filteredCategory = {}
    if(category){
        filteredCategory = {category:category._id}
    }

    const courses = await Course.find(filteredCategory).sort('-createdDate')
    const categories = await Category.find()

    try{
        res.status(200).render('courses.ejs', {
            courses,
            categories,
            pageName : 'courses'
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            err
        })
    }
}

exports.getCourse = async(req, res) => {
    const course = await Course.findOne({slug: req.params.slug})
    try{
        res.status(200).render('course.ejs', {
            course,
            pageName : 'courses'
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            err
        })
    }
}