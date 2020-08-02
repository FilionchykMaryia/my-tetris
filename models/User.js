const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true, unique: true},    
    currScore: {type: Number},
    maxScore: {type: Number},
    currLevel: {type: Number},
});

module.exports = model('User', schema);