const bd = require('../models/db');
const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');
// const createInstrumentSchema = require('../validators/instrument.validators');

const getInstruments = (req, resp) => {
    let instruments = bd.instruments;

    if (req.query.completed !== undefined) {
        const completed = req.query.completed === 'true';
        instruments = instruments.filter(instrument => instrument.completed === completed);
    }

    resp.status(StatusCodes.OK).json(instruments);
};

module.exports = {
    getInstruments
};
