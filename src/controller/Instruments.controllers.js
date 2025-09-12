const bd = require('../models/db');
const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');
const { number } = require('joi');
const createInstrumentSchema = require('../validators/create.intrument.shcema');

const getInstruments = (req, resp) => {
    let instruments = bd.instruments;

    resp.status(StatusCodes.OK).json(instruments);
};

const getInstrumentByid=(req, resp) => {

    const instrumentId=Number(req.param.id);

    if(isNaN){
        req.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Id must be a number"));
        return;
    }
    const instrument = bd.findInstrumentById(instrumentId);

    if(!instrument){
        resp.status(StatusCodes.NOT_FOUND).json(createError("not_found", `Instrument whit ID ${instrumentId} not found`))
        return;
    }
    
    resp.status(StatusCodes.OK).json(instrument);
}

const getInstrumentByTitle = (req, res) => {
    const instrumentTitle = req.param.title;

    if(!isNaN(instrumentTitle)){
        req.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Title must be a text"));
        return;
    }

    const instrument = getInstrumentByTitle(instrumentTitle);

    if(!instrument){
        res.status(StatusCodes.NOT_FOUND).json("not_found", `Instrument with title ${instrumentTitle} not found`);
        return;
    }

    res.status(StatusCodes.OK).json(instrument);
}

const deleteInstrument = (req, res) => {
    const instrumentId = Number(req.param.id);

    if(isNaN(instrumentId)){
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Id must be a number"));
        return;
    }

   const deleted = bd.deleteInstrumentById(instrumentId);

   if(!deleted){
    res.status(StatusCodes.NOT_FOUND).json(createError("not_found", `Instrument with ID ${instrumentId} not found`));
    return;
   }

   res.status(StatusCodes.NO_CONTENT).send();


}

const createInstrument = (req, res) => {
    const { body } = req;
    
    if(!body){
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "invalid body"));
        return;
    }

    const { error } = createInstrumentSchema.validate(body);

    if(error){
        const errorMessage = error.detail[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_reques", errorMessage));
        return;
    }

    const {title, category } = body;

    if(bd.findInstrumentByTitle(title)){
        res.status(StatusCodes.CONFLICT).json(createError("consflict",`Instrument with title ${title} already exists`));
        return;
    }
    
    const newInstrument = bd.addInstrument(body);
    res.status(StatusCodes.OK).json(newInstrument);
}

const updateInstrument = (req, res) => {
    const instrumentId = Number(req.param.id);

     if(isNaN(instrumentId)){
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Id must be a number"));
        return;
    }

    const {title, price, description, category, condition} = req.body;

    if(!title && !price && !description && !category && !condition){
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "At least one field must be provided to update"));
        return;
    }

    const updatedInstrument = bd.updateInstrument(instrumentId, title, price, description, category, condition);

    if(!updateInstrument){
        res.status(StatusCodes.NOT_FOUND).json(createError("not_found", `Instrument with ID ${instrumentId} not found`));
        return;
    }

    res.status(StatusCodes.OK).json(updatedInstrument);
}


module.exports = {
    getInstruments,
    getInstrumentByid,
    getInstrumentByTitle,
    deleteInstrument,
    createInstrument,
    updateInstrument
};
