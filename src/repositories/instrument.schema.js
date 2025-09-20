const mongoose = require('mongoose');
const instrumentSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = instrumentSchema;