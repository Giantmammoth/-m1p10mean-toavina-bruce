const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const garageschema = mongoose.Schema({
    tempsReparation: { type: String, required: true, default: "0" },
    chiffreAffaireJour: { type: String, required: true, default: "0" },
    chiffreAffaireMois: { type: String, required: true, default: "0" },
    depense: [Object],
    benefice: { type: String, required: true, default: "0" },
});

module.exports = mongoose.model('Garage', garageschema);