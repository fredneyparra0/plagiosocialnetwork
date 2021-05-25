const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaGame = new Schema({
	name: String,
	urlPic: String
});

const modelGame = mongoose.model('game', schemaGame);

module.exports = modelGame;