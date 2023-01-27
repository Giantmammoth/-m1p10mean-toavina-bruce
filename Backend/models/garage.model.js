const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const garageschema = mongoose.Schema({
    tempsReparation: [Object],
    chiffreAffaireJour: [Object],
    chiffreAffaireMois: [Object],
    depense: [Object],
    benefice: [Object],
    salaire: { type: String, required: true },
    materiel: { type: String, required: true },
    loyer: { type: String, required: true },

});

module.exports = mongoose.model('Garage', garageschema);