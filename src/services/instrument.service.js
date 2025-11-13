const {StatusCodes} = require('http-status-codes');
const buildInstrumentDTOResponse = require('../dtos/instrument.response.dto');
const instrument = require('../models/instrument.model');
const userService = require('../services/users.service');




const getAllInstruments = async () => {
 
  try {
    const instruments = await instrument.find();
    return instruments.map(buildInstrumentDTOResponse);
  } catch (e) {
    let error = new Error("Error getting all instruments");
    error.status = "internal_server_error";
    error.code = StatusCodes.INTERNAL_SERVER_ERROR;                  
    throw error;
  }
};

const getInstrumentById = async (instrumentId) => {

    let foundInstrument;
    try{
        foundInstrument = await instrument.findById(instrumentId);
    }catch(e){
        let error = new Error("Error finding instrument by ID");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
    if(!foundInstrument){
        let error = new Error(`Instrument was not found`);
        error.status = "not_found";
        error.code = StatusCodes.NOT_FOUND;
        throw error;
    }
    
    return buildInstrumentDTOResponse(foundInstrument);
}

const findInstrumentById = async (instrumentId, userId) => {
    try{
        const instrument = await findInstrumentByIdDB(instrumentId, userId);
        return build(instrument);
    }catch(error){
        throw error;
    }
}

const getInstrumentByUserId = async (userId, from, to) => {
  const filter = { ownerId: userId };

  if (from || to) {
    filter.createdAt = {};

    if (from) filter.createdAt.$gte = new Date(from);

    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); 
      filter.createdAt.$lte = toDate;
    }
  }

  try {
    const instruments = await instrument.find(filter).sort({ createdAt: -1 });

    const instrumentResponse = instruments.map(inst =>
      buildInstrumentDTOResponse(inst)
    );

    return instrumentResponse;
  } catch (e) {
    const error = new Error("Error getting instruments for user");
    error.status = "internal_server_error";
    error.code = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
};


const deleteInstrument = async (instrumentId, userId) => {
  try {
    const instrumentToDelete = await findInstrumentByIdDB(instrumentId, userId);
    
    if (!instrumentToDelete) {
      const error = new Error("Instrumento no encontrado");
      error.code = 404;
      throw error;
    }

    await userService.decrementInstrumentCount(userId);

    await instrumentToDelete.deleteOne();
  } catch (error) {
    throw error;
  }
};

const createInstrument = async (title,description,price,category,condition,ownerId, imageUrl) => {
    if (!title || !description || !price || !category || !condition || !ownerId) {
        let error = new Error("Missing required fields");
        error.status = "bad_request";
        error.code = StatusCodes.BAD_REQUEST;
        throw error;
    }

    const existingInstrument = await instrument.findOne({
        title: { $regex: new RegExp(`^${title}$`, 'i') },
        ownerId: ownerId
    });

    if (existingInstrument) {
        let error = new Error("Ya tienes un instrumento con ese título");
        error.status = "conflict";
        error.code = StatusCodes.CONFLICT;
        throw error;
    }

    await userService.incrementInstrumentCount(ownerId);

    const newInstrument = new instrument({
        title,
        description,
        price,
        category,
        condition,
        ownerId
    });

    if (imageUrl) {
        newInstrument.imageUrl = imageUrl;
    }

    try{
        const savedInstrument = await newInstrument.save();
        return buildInstrumentDTOResponse(savedInstrument);
    }catch(e){
        try{
            await userService.decrementInstrumentCount(ownerId);
        }catch(rollbackErr){
            console.error('Failed to rollback instrument count for user', ownerId, rollbackErr);
        }
        let error = new Error("Error creating instrument");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const updateInstrument = async (instrumentId, userId, updatedData) => {
    try{
        const instrumentToUpdate = await instrument.findById(instrumentId,userId);
        Object.assign(instrumentToUpdate, updatedData);
        const savedInstrument = await instrumentToUpdate.save();
        return buildInstrumentDTOResponse(savedInstrument);
    }catch(error){
        throw error;
    }
}

const findInstrumentByTitle = async (title, userId) => {
  try {
    const instrumentsFound = await instrument.find({
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      ownerId: userId
    });

    return instrumentsFound.map(buildInstrumentDTOResponse); 
  } catch (e) {
    let error = new Error("Error finding instrument by title");
    error.status = "internal_server_error";
    error.code = StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
}

const findInstrumentByIdDB= async (instrumentId, userId) => {
    let foundInstrument;
    try{
        foundInstrument = await instrument.findById(instrumentId);
    }catch(e){
        console.log("Error buscando instrumento por ID", e);
        let error = new Error("Error finding instrument by ID");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
    if(!foundInstrument){
        let error = new Error(`Instrument was not found`);
        error.status = "not_found";
        error.code = StatusCodes.NOT_FOUND;
        throw error;
    }
    if (foundInstrument.ownerId.toString() !== userId) {
        let error = new Error("You are not allowed to access this instrument");
        error.status = "forbidden";
        error.code = StatusCodes.FORBIDDEN;
        throw error;
    }
    return foundInstrument;
}

module.exports = {
    findInstrumentById,
    getInstrumentByUserId,
    deleteInstrument,
    createInstrument,
    updateInstrument,
    findInstrumentByTitle,
    getAllInstruments,
    getInstrumentById
};
