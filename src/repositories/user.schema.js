const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    plan: { type: String, enum: ['plus', 'premium'], default: 'plus'},
    instrumentsCount: { type: Number, default:0},
    createdAt: { type: Date, default: Date.now }
})

module.exports = userSchema;