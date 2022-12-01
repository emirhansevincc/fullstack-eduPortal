const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.createUser = async(req, res) => {
    try{
        const user = await User.create(req.body)

        res.status(201).json({
            status: 'Success',
            user,
        })
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
                        res.status(200).send('You are logged in!')
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