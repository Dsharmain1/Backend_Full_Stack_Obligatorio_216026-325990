const { createError } = require('../utils/errors');
const StatusCodes = require('http-status-codes');
const loginSchema = require('../validators/login.schema');
const jwt = require('jsonwebtoken');

const usersService = require('../services/users.service');

const login = async (req, res) => {
    const { body } = req;

    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return;
    }

    const { error } = loginSchema.validate(body);

    if (error) {
        const errorMessage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
        return;
    }

    const token = await usersService.doLogin(body);

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json(createError("unathorized", "Invalid credentials"));
        return;
    }

    res.status(StatusCodes.OK).json(token);
}

module.exports = login;