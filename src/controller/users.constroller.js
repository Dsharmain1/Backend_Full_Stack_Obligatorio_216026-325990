const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');
const { number } = require('joi');
const userService = require('../services/users.service');

const updateProfile = async (req, res) => {
    const { body } = req;
    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return;
    }   
    try {
        const updatedUser = await userService.updateProfile(req.userId, body);
        res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }   
}

const changePlan = async (req, res) => {    
    const { body } = req;
    if (!body || !body.plan || (body.plan !== 'plus' && body.plan !== 'premium')) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return;
    }
    try {
        const updatedUser = await userService.changePlan(req.userId, body.plan);
        res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}

module.exports = {
    updateProfile,
    changePlan
}