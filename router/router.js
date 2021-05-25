const express = require('express'),
      rootRouter = express.Router(),
      modelUser = require('../models/auth.model'),
      modelGame = require('../models/modelGames');

rootRouter.get('/', (req, res) => {
    res.redirect('/auth/login');
});

rootRouter.use('/auth', require('../router/auth.router'));

rootRouter.get('/home-user/delete-friend/:id', async (req, res) => {
    const userLogged = req.session.userLogged;
    const body = req.params.id;
    if (!userLogged) return res.redirect('/auth/login');

    const user = await modelUser.findOne({ email: userLogged.email});

    user.contacts.filter((id, index) => {
        if(id == body) {
            console.log(index)
            user.contacts.splice(index, 1)
            user.save()
            res.redirect('/home-user/my-contacts')
        }
    }); 
})

rootRouter.get('/home-user/add-friend/:idcontact/:iduser', async (req, res) => {
    const idContact = req.params.idcontact;
    const idProfile = req.params.iduser;
    
    const user = await modelUser.findOne({_id: idProfile});

    user.contacts.push(idContact);
    user.save()

    res.redirect('/home-user/contacts')
});

const modelContact = require('../models/personcontact')
rootRouter.post('/authnew', async (req, res) => {
    const body = req.body;
    const person = new modelContact(body);
    await person.save();
});

rootRouter.get('/home-user', async (req, res) => {
    const userLogged = req.session.userLogged;
    
    if (!userLogged) return res.redirect('/auth/login')
    
    return res.render('home', {user: userLogged});
});

rootRouter.get('/home-user/contacts', async (req, res) => {
    const userLogged = req.session.userLogged;
    
    if (!userLogged) return res.redirect('/auth/login')
    
    const contacts = await modelContact.find();
    res.render('searchpersons', {user: userLogged, contacts: contacts})
});

rootRouter.get('/home-user/my-contacts', async (req, res) => {
    const userLogged = req.session.userLogged;
    if (!userLogged) return res.redirect('/auth/login')

    const contacts = await modelUser.findOne({ email: userLogged.email}).populate('contacts games').exec( (err, contacts) => {
        console.log(contacts);
    })

    res.render('mycontacts', {user: userLogged, contacts: contacts});
});

rootRouter.get('/home-user/add-game', async (req, res) => {
    const game = {
        "name": "fortnite",
        "urlPic": "../images/images.jpg"
    }

    const gameSave = new modelGame(game);
    await gameSave.save();

    res.send(gameSave)
})

rootRouter.get('/home-user/search-games', async (req, res) => {
    const userLogged = req.session.userLogged;
    if (!userLogged) return res.redirect('/auth/login')    

    const games = await modelGame.find({})
    res.render('search-games', { user: userLogged , games: games})
    

})

rootRouter.get('/home-user/add-to-my-game/:game', async (req, res) => {
    const userLogged = req.session.userLogged;
    if (!userLogged) return res.redirect('/auth/login')

    const nameGame = req.params.game;

    const user = await modelUser.findOne({ email: userLogged.email });
    const game = await modelGame.findOne({ name: nameGame });

    user.games.push(game._id);
    user.save();

    res.redirect('/home-user/search-games');
});

rootRouter.get('/home-user/my-games', (req, res) => {
    const userLogged = req.session.userLogged;
    if (!userLogged) return res.redirect('/auth/login')    



});

const modelContacts = require('../models/mycontacts')
rootRouter.post('/addcontact', async (req, res) => {
    const body = req.body;
    // const userLogged = req.session.userLogged;
    // if (!userLogged) return res.redirect('/auth/login')
    
    
    const contact = new modelContacts(body);
    await contact.save();

    const all = await modelUser.find();
    console.log(all);
    
});

module.exports = rootRouter;