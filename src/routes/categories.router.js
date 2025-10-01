const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categories.controller');    

router.get('/categories', categoriesController.getCategories);

module.exports = router;