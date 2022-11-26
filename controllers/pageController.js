exports.getIndexPage = (req, res) => {
    res.status(200).render('index', {
        pageName: 'index' // You can use it navbar active class
    })
}

exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        pageName: 'about'
    })
}