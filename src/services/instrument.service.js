const {StatusCodes} = require('http-status-codes');
const buildInstrumentDTOResponse = require('../dtos/instrument.response.dto');
const instrument = require('../models/instrument.model');


const findInstrumentById = async (instrumentId, userId) => {
    try{
        const instrument = await findInstrumentByIdDB(instrumentId, userId);
        return buildInstrumentDTOResponse(instrument);
    }catch(error){
        throw error;
    }
}

const getInstrumentByUserId = async userId => {
    try{
        const instruments = await instrument.find({ownerId: userId});
        let instrumentResponse = instruments.map(instrument =>{
            return buildInstrumentDTOResponse(instrument);  
        });
        return instrumentResponse;
    }catch(e){
        console.log("rror obtniendo los instrumentos del usuario", e);
        let error = new Error("Error getting instruments for user");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const deleteInstrument = async (instrumentId, userId) => {
    try{
        const instrument = await instrument.findInstrumentById(instrumentId,userId);
        await instrument.deleteOne();
    }catch (error){
        throw error;
    }
}

const createInstrument = async (title,description,price,category,condition,ownerId) => {
    const newInstrument = new instrument({
        title,
        description, 
        price,
        category,
        condition,
        ownerId
    });
    try{
        const savedInstrument = await newInstrument.save();
        return buildInstrumentDTOResponse(savedInstrument);
    }catch(e){
        console.log("Error creando instrumento", e);
        let error = new Error("Error creating instrument");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const updateInstrument = async (instrumentId, userId, updatedData) => {
    try{
        const instrumentToUpdate = await instrument.findInstrumentById(instrumentId,userId);
        Object.assign(instrumentToUpdate, updatedData);
        const savedInstrument = await instrumentToUpdate.save();
        return buildInstrumentDTOResponse(savedInstrument);
    }catch(error){
        throw error;
    }
}


const findInstrumentByIdDB= async (instrumentId, userId) => {
    let foundInstrument;
    try{
        foundInstrument = await instrument.findInstrumentById(instrumentId);
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
    updateInstrument
};
