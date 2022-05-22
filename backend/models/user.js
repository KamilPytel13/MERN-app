const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
// npm install --save mongoose-unique-validator

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    apartment: { type: Number, required: true }
});

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);