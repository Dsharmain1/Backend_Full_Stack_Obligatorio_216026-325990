const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');

const statisticsService = require('../services/statistics.service');

const userStatistics = async (req, res) => {
    const {userId} = req; 
    if (!userId) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid userId"));
        return;
    }
    try {
        const stats = await statisticsService.userStatistics(userId);
        res.status(StatusCodes.OK).json(stats);
    } catch (error) {
        const status = error.code || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Internal server error";
        res.status(status).json(createError(error.status, message));
}
}

module.exports = {
    userStatistics
}
