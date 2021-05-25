const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemauser = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    contacts:[
        {
          type: Schema.Types.ObjectId,
          ref: 'contacts',
        }
    ],
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: 'game'
        }
    ]
});

const model = mongoose.model('users', schemauser);


module.exports = model ;