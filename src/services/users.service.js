const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const buildUserDTOResponse = require('../dtos/user.response.dto');
const { StatusCodes } = require('http-status-codes');


const doLogin = async ({ username, password }) => {
    const user = await getUserByUserName(username);
    
    
    if (!user) {
        return null;
    }
    const compareResult = await bcrypt.compare(password, user.password);
    

    if (!compareResult) {
        return null;
    }

    const token = jwt.sign({ username: user.username, userId: user._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

    return { token: token };
}

const registerUser = async ({ username, email, password}) => {
    if (await getUserByUserName(username)) {
        let error = new Error("user already exists");
        error.status = "conflict";
        error.code = StatusCodes.CONFLICT; 
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save();
        const userDTO = buildUserDTOResponse(savedUser);
        return userDTO;
    } catch (error) {
        let e = new Error("error saving user in database");
        e.status = "internal_error";
        e.code = StatusCodes.INTERNAL_SERVER_ERROR;
        console.log("Error saving user in database", error);
        throw e;
    }
}

const getUserByUserName = async username => await User.findOne({ username: username })

module.exports = {
    doLogin,
    registerUser
};