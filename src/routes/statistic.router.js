const express = require('express');

const { userStatistics } = require('../controller/statistic.controller');

const router = express.Router();  

router.get("/statistic/", userStatistics);

module.exports = router;