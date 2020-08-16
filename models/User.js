const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true, unique: true},    
    currScore: {type: Number, default: 0},
    currRows: {type: Number, default: 0},
    currLevel: {type: Number, default: 0},
    maxScore: {type: Number, default: 0},
    
});

module.exports = model('User', schema);