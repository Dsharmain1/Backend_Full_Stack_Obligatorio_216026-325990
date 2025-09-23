 const { buildInstrumentDTOResponse } = require('./instrument.response.dto');

function buildInstrumentListDTOResponse(instruments) {
  return instruments.map(instrument => ({Title : instrument.title, 
                                        Price : instrument.price})); 
}
module.exports =  buildInstrumentListDTOResponse;