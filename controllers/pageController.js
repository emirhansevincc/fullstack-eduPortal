const nodemailer = require("nodemailer");
const Course = require('../models/Course')
const User = require('../models/User')

exports.getIndexPage = async(req, res) => {
    console.log(req.session.userID);
    const latestTwoCourse = await Course.find().sort('-createdDate').limit(2)
    const totalStudents = await User.countDocuments({role: 'student'})
    const totalTeachers = await User.countDocuments({role: 'teacher'})
    const totalCourses = await Course.find().countDocuments()

    res.status(200).render('index', {
        pageName: 'index', // You can use it navbar active class
        latestTwoCourse,
        totalStudents,
        totalTeachers,
        totalCourses
    })
}

exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        pageName: 'about'
    })
}

exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        pageName: 'register'
    })
}

exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        pageName: 'login'
    })
}

exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        pageName: 'contact'
    })
}

exports.sendEmail = async(req, res) => {

    try {

        const mail =`
        <h2>SmartEDU Platform</h2>
        <hr/>
        <h3>From: ${req.body.name} / ${req.body.email}</h3>
        <br/>
        <p>MESSAGE : ${req.body.message}</p>
    `

        // create reusable transporter object using the default SMTP transport
        let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'emirhansvncc@gmail.com', // generated ethereal user
            pass: 'hwymyjtrsdmborlh', // generated ethereal password
        },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '<emirhansvncc@gmail.com>', // sender address
        to: "emirhan.sevinc22@hacettepe.edu.tr", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `${mail}`, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        await req.flash('success', 'We Received your message succesfully')

        await res.status(200).redirect('/contact')
        
    } catch (error) {

        await req.flash('error', `There is a problem! ${error}`)
        await res.status(200).redirect('/contact')

    }
    
}