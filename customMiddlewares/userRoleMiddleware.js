module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.roles
        if(roles.includes(userRole)){
            next()
        } else {
            res.status(401).send('Something went wrong!')
        }
    }
}