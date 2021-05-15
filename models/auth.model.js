const mongoose = require('mongoose');

const schemauser = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const model = mongoose.model('users', schemauser);


module.exports = model ;