
const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');
const categoriesServices = require('../services/categories.service');


const getCategories = async (req, res) => {
    try{
      const categories = await categoriesServices.getCategories();
      res.status(StatusCodes.OK).json(categories);
    }catch(error){
      res.status(error.code || 500).json(createError(error.status, error.message));
    }  

}

module.exports = {
    getCategories
}