const { logRequest } = require('../utils/logger');

const loggerMiddleware = (req, res, next) => {
    console.log("Ejecutando middleware de logging...");
    logRequest(req);
    next();
}

module.exports = { loggerMiddleware };