const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const schemaMyFriends = new Schema({
     name : String
})      

const model = mongoose.model('contacts', schemaMyFriends);

module.exports = model;