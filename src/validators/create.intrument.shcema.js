const Joi = require('joi');

const createInstrumentSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    category: Joi.string().valid('string', 'wind', 'percussion', 'keyboard').required(),
    price: Joi.number().positive().required(),
    condition: Joi.string().valid('new', 'used').required(),
    description: Joi.string().max(500).optional()
});