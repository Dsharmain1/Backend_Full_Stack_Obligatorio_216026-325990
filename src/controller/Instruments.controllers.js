const bd = require('../models/db');
const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');
const { number } = require('joi');
const {createInstrumentSchema} = require('../validators/create.instrument.schema');
const instrumentService = require('../services/instrument.service');
const userService = require('../services/users.service');

//publics

const publicGetInstrumentById = async (req, res) => {

   const instrumentId = req.params.id;

    try{
      const instrument = await instrumentService.getInstrumentById(instrumentId);
      res.status(StatusCodes.OK).json(instrument);
    }catch(error){
      res.status(error.code || 500).json(createError(error.status, error.message));
    }  

}

const getAllInstruments = async (req, res) => {
  const { from, to } = req.query;
  try {
    const instruments = await instrumentService.getAllInstruments(from, to);
    res.status(200).json(instruments);
  } catch (e) {

    const statusCode = e.code || 500;
    const message = e.message || "Error getting instruments";

    res.status(statusCode).json({
      error: message,
      status: e.status || "internal_server_error",
    });
  }
}; 


//protected 

const getInstruments = async (req, res) => {
      try{
        let instruments = await instrumentService.getInstrumentByUserId(req.userId);
        res.status(StatusCodes.OK).json(instruments);
      }catch(error){
        res.status(error.code || 500).json(createError(error.status, error.message));
      }
}

const getInstrumentById = async (req, res) => {
    const instrumentId = req.params.id;

    try{
      const instrument = await instrumentService.findInstrumentById(instrumentId, req.userId);
      res.status(StatusCodes.OK).json(instrument);
    }catch(error){
      res.status(error.code || 500).json(createError(error.status, error.message));
    }  
}

const getInstrumentByTitle = async (req, res) => {
    const instrumentTitle = req.params.title;
    try{
        const instrument = await instrumentService.findInstrumentByTitle(instrumentTitle, req.userId);
        res.status(StatusCodes.OK).json(instrument);
    }catch(error){
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}

const deleteInstrument = async(req, res) => {
    const instrumentId = req.params.id;

    try{
        await instrumentService.deleteInstrument(instrumentId, req.userId);
        await userService.decrementInstrumentCount(req.userId);
        res.status(StatusCodes.NO_CONTENT).send();
    }catch(error){
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
 
}

const createInstrument = async (req, res) => {

  const { body } = req;

  if (!body) {
    res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
    return;
  }

  const { error } = createInstrumentSchema.validate(body);

  if (error) {
    const errorMessage = error.details[0].message;
    res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
    return;
  }

  const { title } = body;

  try {
    const newInstrument = await instrumentService.createInstrument(
      title,
      body.description,
      body.price,
      body.category,
      body.condition,
      req.userId
    );

    await userService.incrementInstrumentCount(req.userId);

    res.status(StatusCodes.CREATED).json(newInstrument);
  } catch (error) {
    res.status(error.code || 500).json(createError(error.status, error.message));
  }
};



const updateInstrument = async (req, res) => {
  const instrumentId = req.params.id;

  const { body } = req;

  if (!body) {
    res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
    return;
  }
  try {
    const updatedInstrument = await instrumentService.updateInstrument(instrumentId, req.userId, body);
    res.status(StatusCodes.OK).json(updatedInstrument);
  } catch (error) {
    res.status(error.code || 500).json(createError(error.status, error.message));
  }
};


module.exports = {
    getInstruments,
    getInstrumentById,
    getInstrumentByTitle,
    deleteInstrument,
    createInstrument,
    updateInstrument,
    getAllInstruments,
    publicGetInstrumentById
};
