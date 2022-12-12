exports.getIndexPage = (req, res) => {
    console.log(req.session.userID);
    res.status(200).render('index', {
        pageName: 'index' // You can use it navbar active class
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