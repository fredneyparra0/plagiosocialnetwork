const { urlencoded } = require('body-parser');

const express = require('express'),
      router = express.Router(),
      modelUser = require('../models/model');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.render('index',{ show: true, message: '' , error : ''});
});    

router.post('/usercreated', async (req, res) => {
    const body = req.body;
    const validateUser = await modelUser.findOne({email : req.body.email});
    if (validateUser) {
        return res.render('index',{ show: true, message: '' , error : 'email entered is already registered  '})
    }
    const user = new modelUser(body);
    await user.save();
    res.render('usercreate', { show: true, message: '' });
});

router.post('/home-user', async (req, res) => {
    const body = req.body;
    res.render('home');
});

module.exports = router;