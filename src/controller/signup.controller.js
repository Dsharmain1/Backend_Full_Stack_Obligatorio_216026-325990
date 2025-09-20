const {createError} = require('../utils/error');
const StatusCodes = require('http-status-codes');
const signupSchema = require('../validators/create.user.schema');

const usersService = require('../services/users.service');

const signup = async (req, res) => {
    const { body } = req;

    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return;
    }

    const { error } = signupSchema.validate(body);

    if (error) {
        const errorMessage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
        return;
    }
    
    try {
        const newUser = await usersService.registerUser(body);
        res.status(StatusCodes.CREATED).json(newUser);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}

module.exports = signup;
