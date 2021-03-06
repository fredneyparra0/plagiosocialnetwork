const express = require('express'),
      authRouter = express.Router(),
      modelUser = require('../models/auth.model.js'),
      modelContact = require('../models/personcontact'),
      authController = require('../controllers/auth.controller');

authRouter.get('/', (req, res) => {
    res.redirect('/auth/login');
});

authRouter.get('/login', authController.showLoginForm);
authRouter.post('/login', authController.validateLogin);


authRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login");
    })
});

authRouter.get('/signup', (req, res) => {
    res.render('signup',{ errorMsg: ''});
});

authRouter.post('/signup', async (req, res) => {
    const body = req.body;
    console.log(body.name);
    const validateUser = await modelUser.findOne({email : body.email});
    if (validateUser)
        return res.render('signup', {errorMsg: 'Email entered is already registered'})

    const user = new modelUser(body);
    const contact = new modelContact(body);
    user.save();
    contact.save();
    res.render('usercreate', { show: true, message: '' });
});

module.exports = authRouter;