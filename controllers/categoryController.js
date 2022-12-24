const Category = require('../models/Category')

exports.createCategory = async(req, res) => {
    try{
        const category = await Category.create(req.body)

        res.status(201).redirect('/users/dashboard')
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            err
        })
    }
}

exports.deleteCategory = async(req, res) => {
    try{
        await Category.findByIdAndRemove(req.params.id)
        res.status(201).redirect('/users/dashboard')
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            err
        })
    }
}