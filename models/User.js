const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        type: String,
        enum: ['student','teacher','admin'],
        default: 'student'
    }
})

const saltRounds = 10
UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        this.password = hash
        next()
    })
})


const User = mongoose.model('User', UserSchema)
module.exports = User