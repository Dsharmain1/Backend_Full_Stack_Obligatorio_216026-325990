const Joi = require('joi');

const createTodoSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().email().required().messages( { "string.email": "Invalid email format. Should be: algo@mail.com" } ),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
})

module.exports = createTodoSchema;