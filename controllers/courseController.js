const User = require('../models/User')
const Course = require('../models/Course')
const Category = require('../models/Category')

exports.createCourse = async(req, res) => {
    try{
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID,
        })

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
    const course = await Course.findOne({slug: req.params.slug}).populate('user')
    const user = await User.findById(req.session.userID);
    try{
        res.status(200).render('course.ejs', {
            course,
            pageName : 'courses',
            user
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            err
        })
    }
}

exports.enrollCourse = async(req, res) => {
    
    try{

        const user = await User.findById(req.session.userID);
        await user.courses.push({_id: req.body.course_id})
        await user.save()

        res.status(200).redirect('/users/dashboard')
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            err
        })
    }
}