const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify')

const CategorySchema = new Schema({
    name: {
        required: true,
        unique: true,
        type: String,
    },
    slug: {
        unique: true,
        type: String,
    },
})

CategorySchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        strict: true,
        lower: true
    })
    next()
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category