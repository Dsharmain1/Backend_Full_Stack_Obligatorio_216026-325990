const { StatusCodes }  = require("http-status-codes");
const jwt = require("jsonwebtoken");
const {createError} = require("../utils/error");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];

    if(!token){
        res.status(StatusCodes.UNAUTHORIZED).json(createError("unauthorized", "No token provided"));
        return;
    }
    try{
        const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifiedJWT.userId;
        next();
    } catch (error){
        res.status(StatusCodes.UNAUTHORIZED).json(createError("unauthorized", "Invalid token"));
        return;
    }
};

module.exports = {authMiddleware};