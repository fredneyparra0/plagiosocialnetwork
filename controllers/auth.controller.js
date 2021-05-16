const authRouter = require('../router/auth.router'),
    modelUser = require('../models/auth.model');

const showLoginForm = (req, res) => {
    console.log("req.session.userLogged", req.session.userLogged);
    if (req.session.userLogged) res.redirect("/home-user")
    res.render('login', {errorMsg: null, email: null});
}

const validateLogin = async (req, res) => {
    let {email, password} = req.body;
    const user = await modelUser.findOne({email});
    if (!user || password !== user.password)
        return res.render('login', {errorMsg : 'Email or password incorrect', email: req.body.email});

    req.session.userLogged = {email: user.email, name: user.name};
    res.redirect("/home-user/");
}

module.exports = {
    showLoginForm,
    validateLogin
};