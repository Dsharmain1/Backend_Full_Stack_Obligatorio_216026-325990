const express = require('express');
const { getInstruments } = require('../controller/Instruments.controllers');

const router = express.Router();

router.get("/instruments", getInstruments);

module.exports = router;
