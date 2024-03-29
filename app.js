const express = require('express')
const pageRoute = require('./routes/pageRoute') 
const mongoose = require('mongoose')
const courseRoute = require('./routes/courseRoute')
const bodyParser = require('body-parser')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')
const session = require('express-session'); 
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override')

const app = express()

mongoose.connect('mongodb://localhost:27017/eduPortal-db');

// Template Engine
app.set('view engine', 'ejs')

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/eduPortal-db' })
}))
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash()
    next()
})
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

global.userIN = null
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use('/', pageRoute)
app.use('/courses', courseRoute) 
app.use('/categories', categoryRoute)
app.use('/users', userRoute)


const port = 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
}) 