const Joi = require('joi');

const createInstrumentSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    category: Joi.string().valid('string', 'wind', 'percussion', 'keyboard').required(),
    price: Joi.number().positive().required(),
    condition: Joi.string().valid('new', 'used').required(),
    description: Joi.string().max(1000).required(),
    imageUrl: Joi.string().uri().optional()
});

module.exports = { createInstrumentSchema };