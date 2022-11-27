const express = require('express')
const pageRoute = require('./routes/pageRoute') 
const mongoose = require('mongoose')
const courseRoute = require('./routes/courseRoute')
const bodyParser = require('body-parser')

const app = express()

mongoose.connect('mongodb://localhost:27017/eduPortal-db');

// Template Engine
app.set('view engine', 'ejs')

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', pageRoute)
app.use('/courses', courseRoute)

app.get('/about', pageRoute)

const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
}) 