const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const serviceschema = mongoose.Schema({
    tache: { type: String, required: true },
    prix: { type: String, required: true },
    delai: { type: String, required: true },
});

module.exports = mongoose.model('Service', serviceschema);