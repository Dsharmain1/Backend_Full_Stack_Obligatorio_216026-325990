const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');
const {createInstrumentSchema} = require('../validators/create.instrument.schema');
const instrumentService = require('../services/instrument.service');

//publics

const publicGetInstrumentById = async (req, res) => {
  const instrumentId = req.params.id;

  if (!instrumentId) {
    res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Instrument ID is required"));
    return;
  }

  try {
    const instrument = await instrumentService.getInstrumentById(instrumentId);
    res.status(StatusCodes.OK).json(instrument);
  } catch (error) {
    res.status(error.code || 500).json(createError(error.status, error.message));
  }
}


const getAllInstruments = async (req, res) => {
  
  try {
    const instruments = await instrumentService.getAllInstruments();
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

  const { from, to } = req.query;
  if ((from && isNaN(Date.parse(from))) || (to && isNaN(Date.parse(to)))) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Invalid date format in query params",
      status: "bad_request"
    });
    return;
  }

      try{
        let instruments = await instrumentService.getInstrumentByUserId(req.userId, from, to);
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
    const instruments = await instrumentService.findInstrumentByTitle(instrumentTitle, req.userId);

    if (!instruments || instruments.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json(createError("not_found", `Instrument with title ${instrumentTitle} not found`));
    }

    return res.status(StatusCodes.OK).json(instruments);
  }catch(error){
    return res.status(error.code || 500).json(createError(error.status, error.message));
  }
}

const deleteInstrument = async(req, res) => {
    const instrumentId = req.params.id;

    try{
        await instrumentService.deleteInstrument(instrumentId, req.userId);
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

    const { title, imageUrl } = body;

  try {
    const newInstrument = await instrumentService.createInstrument(
      title,
      body.description,
      body.price,
      body.category,
      body.condition,
      req.userId,
      imageUrl
    );
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
