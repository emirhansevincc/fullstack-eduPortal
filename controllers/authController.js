const User = require('../models/User')
const Category = require('../models/Category')
const bcrypt = require('bcrypt')
const Course = require('../models/Course')

exports.createUser = async(req, res) => {
    try{
        const user = await User.create(req.body)

        res.status(201).redirect('/login')
    } catch (err) {
        res.status(400).json({
            status: 'Failed',  
            err
        })
    }
}

exports. loginUser = async(req, res) => {
    try{
        const email = await req.body.email
        const password = await req.body.password

        User.findOne({email: email}, (err, user) => {
            if(user){
                bcrypt.compare( password, user.password, (err, same) => {
                    if(same){
                        req.session.userID = user._id
                        res.status(200).redirect('/users/dashboard')
                    }
                } )
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'Failed',  
            err
        })
    }
}

exports.logout = async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

exports.getDashboardPage = async(req, res) => {
    const currentUser = await User.findOne({_id: req.session.userID})
    const categories = await Category.find()
    const courses = await Course.find({user: req.session.userID}).populate('user')

    res.status(200).render('dashboard', {
        currentUser,
        pageName: 'dashboard',
        categories,
        courses
    })
}