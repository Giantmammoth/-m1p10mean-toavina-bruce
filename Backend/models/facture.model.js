const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const factureschema = mongoose.Schema({
    idCar: { type: ObjectId, ref: "car", required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    matricule: { type: String, required: true },
    listReparation: [Object],
    materiel: [Object],
    prixMateriel: { type: String, required: true, default: "0"},
    totalPrix: { type: String, required: true, default: "0"},
    recuPayement : { type: Boolean, default: false },
    confirmePayement : { type: Boolean, default: false },
    dateDepot: { type: String, required: true, default: ""},
    dateEcheance: { type: String, required: true, default: ""},
    dateDebut: { type: String, required: false, default: ""},
    dateSortie: { type: String, required: false, default: ""},
    user: { type: ObjectId, ref: "user", required: true },
    userName: { type: String, required: true },  
});

module.exports = mongoose.model('Facture', factureschema);