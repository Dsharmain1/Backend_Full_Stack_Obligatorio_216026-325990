const buildInstrumentDTOResponse = (instrument) => {
    return {
        title: instrument.title,
        description: instrument.description,
        price: instrument.price,
        category: instrument.category,
        condition: instrument.condition
    };
}

module.exports =  buildInstrumentDTOResponse;