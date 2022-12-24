const User = require('../models/User')
const Category = require('../models/Category')
const bcrypt = require('bcrypt')
const Course = require('../models/Course')

const { body, validationResult } = require('express-validator');

exports.createUser = async(req, res) => {
    try{
        const user = await User.create(req.body)

        res.status(201).redirect('/login')
    } catch (err) {
        const errors = validationResult(req);
        console.log(errors.array()[0].msg);
        for (let index = 0; index < errors.array().length; index++) {
            req.flash('error', `${errors.array()[index].msg}`)

        }
        res.redirect('/register')
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
                    }else {
                        req.flash('error', 'Your password is incorrect');
                        res.status(400).redirect('/login')
                    }
                } )
            }else{
                req.flash('error', 'User is not exist!');
                res.status(400).redirect('/login')
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
    const currentUser = await User.findOne({_id: req.session.userID}).populate('courses')
    const categories = await Category.find()
    const courses = await Course.find({user: req.session.userID}).populate('user')
    const users = await User.find()

    res.status(200).render('dashboard', {
        currentUser,
        pageName: 'dashboard',
        categories,
        courses,
        users
    })
}

exports.deleteUser = async (req, res) => {
    try {    
        await User.findByIdAndRemove(req.params.id)
        await Course.deleteMany({user:req.params.id})
        res.status(200).redirect('/users/dashboard');
        
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };