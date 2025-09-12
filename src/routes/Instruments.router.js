const express = require('express');

const { getInstruments,
        getInstrumentByid,
        getInstrumentByTitle,
        deleteInstrument,
        createInstrument,
        updateInstrument
 } = require('../controller/Instruments.controllers');

const router = express.Router();

router.get("/instruments", getInstruments);

router.get("/instruments/:id", getInstrumentByid);

router.get("/instruments/:title", getInstrumentByTitle);

router.delete("/instruments/:id", deleteInstrument);

router.post("/instruments", createInstrument);

router.put("/instrument/:id", updateInstrument);

module.exports = router;
