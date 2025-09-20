const bd = require('../models/db');
const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');
const { number } = require('joi');
const {createInstrumentSchema} = require('../validators/create.instrument.schema');

const getInstruments = (req, res) => {
      let instruments = bd.instruments;

      res.status(StatusCodes.OK).json(instruments);
};

const getInstrumentByid=(req, res) => {

    const instrumentId=Number(req.params.id);

    if(isNaN(instrumentId)){
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Id must be a number"));
        return;
    }
    const instrument = bd.findInstrumentById(instrumentId);

    if(!instrument){
        res.status(StatusCodes.NOT_FOUND).json(createError("not_found", `Instrument whit ID ${instrumentId} not found`))
        return;
    }
    
    res.status(StatusCodes.OK).json(instrument);
}

const getInstrumentByTitle = (req, res) => {
    const instrumentTitle = req.params.title;

    if(!isNaN(instrumentTitle)){
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Title must be a text"));
        return;
    }

    const instrument = bd.findInstrumentByTitle(instrumentTitle);

    if(!instrument){
        res.status(StatusCodes.NOT_FOUND).json("not_found", `Instrument with title ${instrumentTitle} not found`);
        return;
    }

    res.status(StatusCodes.OK).json(instrument);
}

const deleteInstrument = (req, res) => {
    const instrumentId = Number(req.params.id);

    if(isNaN(instrumentId)){
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Id must be a number"));
        return;
    }

    const instrument = bd.findInstrumentById(instrumentId);

    if (instrument.ownerId != req.userId) {
        res.status(StatusCodes.FORBIDDEN).json(createError("forbidden", "You are not allowed to delete this instrument"));
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
  
  if (!body) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createError("bad_request", "Invalid body"));
    return;
  }

  const { error } = createInstrumentSchema.validate(body);

  if (error) {
    const errorMessage = error.details[0].message; 
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createError("bad_request", errorMessage)); 
    return;
  }

  const { title } = body;

  if (bd.findInstrumentByTitle(title)) {
    res
      .status(StatusCodes.CONFLICT) 
      .json(createError("conflict", `Instrument with title '${title}' already exists`));
    return;
  }
  
  const newInstrument = bd.addInstrument(body);
  res.status(StatusCodes.CREATED).json(newInstrument); 
};


const updateInstrument = (req, res) => {
  const instrumentId = Number(req.params.id);

  if (isNaN(instrumentId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(createError("bad_request", "Id must be a number"));
  }

  const { title, price, description, category, condition } = req.body;

  if (!title && !price && !description && !category && !condition) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(createError("bad_request", "At least one field must be provided to update"));
  }

  // pasar req.body completo a bd.updateInstrument
  const updatedInstrument = bd.updateInstrument(instrumentId, req.body);

  if (!updatedInstrument) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(createError("not_found", `Instrument with ID ${instrumentId} not found`));
  }

  res.status(StatusCodes.OK).json(updatedInstrument);
};


module.exports = {
    getInstruments,
    getInstrumentByid,
    getInstrumentByTitle,
    deleteInstrument,
    createInstrument,
    updateInstrument
};
