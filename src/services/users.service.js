const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const buildUserDTOResponse = require('../dtos/user.response.dto');
const { StatusCodes } = require('http-status-codes');
const { object } = require('joi');


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

const registerUser = async ({ username, email, password, firstName, lastName}) => {

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
        firstName: firstName,
        lastName: lastName,
        plan: 'plus',
        instrumentsCount: 0,
        createAt: new Date()
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

const updateProfile = async (userId, { firstName, lastName, email, password}) => {
    
    try{
        const user = await User.findById(userId);
        console.log(user);
        Object.assign(user, { firstName, lastName, email , password: password ? await bcrypt.hash(password, 10) : user.password});
        const savedUser = await user.save();
        return buildUserDTOResponse(savedUser);

    }catch(e){
        throw error;
    }
}

const changePlan = async (userId, newPlan) => {
    try{
        const user = await User.findById(userId);
        user.plan = newPlan;
        const savedUser = await user.save();
        return buildUserDTOResponse(savedUser);
    }catch(e){
        throw error;
    }       
}

const incrementInstrumentCount = async (userId) => {
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
        let error = new Error("user not found");
        error.status = "not_found";
        error.code = StatusCodes.NOT_FOUND;
        throw error;
    }
    user.instrumentsCount += 1; 
    await user.save();
}

const decrementInstrumentCount = async (userId) => {
    const user = await User.findById(userId);      
    if (!user) {
        let error = new Error("user not found");
        error.status = "not_found";
        error.code = StatusCodes.NOT_FOUND;
        throw error;
    }
    if(user.instrumentsCount > 0){
        user.instrumentsCount -= 1;
    }

    await user.save();

}

const getUserByUserName = async username => await User.findOne({ username: username })

module.exports = {
    doLogin,
    registerUser,
    incrementInstrumentCount,
    decrementInstrumentCount,
    updateProfile,
    changePlan,
};