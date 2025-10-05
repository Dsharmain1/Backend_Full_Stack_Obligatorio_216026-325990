const {StatusCodes} = require('http-status-codes');
const User = require('../models/user.model');


const userStatistics = async (UserId) => {
    let user;
    let aux = 0;
    try {
        user = await User.findById(UserId);

        const count = user.instrumentsCount;

        switch(user.plan){
            case "plus":
                aux = count * 10 + "%";
                break;
            case "premium":
                aux = count;
                break;
        }

        return aux;

    } catch(e){ 
        if (!user) {
            let error = new Error("user not found");
            error.status = "not_found"; 
            error.code = StatusCodes.NOT_FOUND;
            throw error;
        }
        let error = new Error("Error getting user statistics");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}
module.exports = {
    userStatistics
} 
