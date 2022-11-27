const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
})

const Course = mongoose.model('Course', CourseSchema)
module.exports = Course