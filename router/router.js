const express = require('express'),
      rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.redirect('/auth/login');
});

rootRouter.use('/auth', require('../router/auth.router'));


const modelContact = require('../models/personcontact')
rootRouter.post('/authnew', async (req, res) => {
    const body = req.body;
    const person = new modelContact(body);
    await person.save();
});

rootRouter.get('/home-user', async (req, res) => {
    const userLogged = req.session.userLogged;
    
    if (!userLogged) return res.redirect('/auth/login')
    
    return res.render('home', {user: userLogged, contacts: contacts});
});

rootRouter.get('/home-user/contacts', async (req, res) => {
    const userLogged = req.session.userLogged;

    if (!userLogged) return res.redirect('/auth/login')
    
    const contacts = await modelContact.find();
    res.render('contacts', {user: userLogged, contacts: contacts})
})

module.exports = rootRouter;