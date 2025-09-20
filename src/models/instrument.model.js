const mongoose = require('mongoose');
const instrumentSchema = require('../repositories/instrument.schema');

const Instrument = mongoose.model('Instrument', instrumentSchema);

module.exports = Instrument;
