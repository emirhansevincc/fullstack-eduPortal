const User = require('../models/User')

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