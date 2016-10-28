'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

module.exports = mongoose.model('User', userSchema);