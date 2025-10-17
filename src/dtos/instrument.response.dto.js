const buildInstrumentDTOResponse = (instrument) => {
    if (!instrument) return null;
    return {
        id: instrument._id ? instrument._id.toString() : instrument.id,
        title: instrument.title,
        type: instrument.type,
        description: instrument.description,
        price: instrument.price,
        category: instrument.category,
        condition: instrument.condition,
        ownerId: instrument.ownerId ? instrument.ownerId.toString() : instrument.ownerId,
        createdAt: instrument.createdAt,
        updatedAt: instrument.updatedAt
    };
}

module.exports =  buildInstrumentDTOResponse;