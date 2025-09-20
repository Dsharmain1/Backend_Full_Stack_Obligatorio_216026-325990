const buildInstrumentDTOResponse = (instrument) => {
    return {
        id: instrument.id,
        title: instrument.title,
        description: instrument.description,
        price: instrument.price,
        ownerId: instrument.ownerId
    };
}

module.exports =  buildInstrumentDTOResponse;