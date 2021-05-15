const express = require('express'),
      rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.redirect('/auth/login');
});

rootRouter.use('/auth', require('../router/auth.router'));

rootRouter.get('/home-user', async (req, res) => {
    const userLogged = req.session.userLogged;

    if (!userLogged) return res.redirect('/auth/login')

    return res.render('home', {user: userLogged});
});

module.exports = rootRouter;