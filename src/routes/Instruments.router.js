const express = require('express');

const { getInstruments,
        getInstrumentById,
        getInstrumentByTitle,
        deleteInstrument,
        createInstrument,
        updateInstrument,
 } = require('../controller/Instruments.controllers');

const router = express.Router();

router.get("/instruments", getInstruments);

router.get("/instruments/id/:id", getInstrumentById);

router.get("/instruments/title/:title", getInstrumentByTitle);

router.delete("/instruments/:id", deleteInstrument);

router.post("/instruments", createInstrument);

router.put("/instruments/:id", updateInstrument);


module.exports = router;
