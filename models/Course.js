const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify')

const CourseSchema = new Schema({
    name: {
        required: true,
        unique: true,
        type: String,
        trim: true
    },
    description: {
        required: true,
        unique: true,
        type: String,
        trim: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    slug: {
        unique: true,
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

CourseSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        strict: true,
        lower: true
    })
    next()
})

const Course = mongoose.model('Course', CourseSchema)
module.exports = Course