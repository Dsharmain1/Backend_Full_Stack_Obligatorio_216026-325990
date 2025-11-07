const mongoose = require('mongoose');
const instrumentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String, required: false }
}, { timestamps: true });

// Ensure uniqueness of title per owner (allows same title across different users)
instrumentSchema.index({ ownerId: 1, title: 1 }, { unique: true });

module.exports = instrumentSchema;