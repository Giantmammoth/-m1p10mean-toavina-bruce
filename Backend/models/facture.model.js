const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const factureschema = mongoose.Schema({
    idCar: { type: ObjectId, ref: "car", required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    matricule: { type: String, required: true },
    listReparation: [Object],
    totalPrix: { type: String, required: true, default: "0"},
    statue : { type: Boolean, default: false },
    dateDepot: { type: String, required: true, default: ""},
    dateSortie: { type: String, required: true, default: ""},
    user: { type: ObjectId, ref: "user", required: true },
    userName: { type: String, required: true },  
});

module.exports = mongoose.model('Facture', factureschema);