const express = require('express');

const { getAllInstruments, publicGetInstrumentById } = require('../controller/Instruments.controllers');

const router = express.Router();

router.get("/allInstruments", getAllInstruments);
router.get("/instruments/id/:id", publicGetInstrumentById);

module.exports = router;