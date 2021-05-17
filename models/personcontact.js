const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const schemaContact = new Schema({
    name: String
});

const modelContact = mongoose.model('contact', schemaContact);

module.exports = modelContact;