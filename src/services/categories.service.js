const Category = require('../models/category.model');
const {StatusCodes} = require('http-status-codes');

const getCategories = async () => {
    try {
        const categories = await Category.find({}, { title: 1, _id: 0 });
        return categories.map(cat => cat.title);
    } catch (error) {
        throw {status: "internal_server_error", message: "Error getting categories", code: StatusCodes.INTERNAL_SERVER_ERROR};
    }   
}

module.exports = {
    getCategories
}