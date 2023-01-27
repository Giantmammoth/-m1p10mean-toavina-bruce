const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const carschema = mongoose.Schema({
    model: { type: String, required: true },
    type: { type: String, required: true },
    matricule: { type: String, required: true },
    listReparation: [Object],
    materiel: [Object],
    confirmationList : { type: Boolean, default: false },
    prixMateriel: { type: String, required: true, default: "0"},
    totalPrix: { type: String, required: true, default: "0"},
    dateDepot: { type: String, required: true, default: ""},
    dateDebut: { type: String, required: false, default: ""},
    dateSortie: { type: String, required: false, default: ""},
    start : { type: Boolean, default: false },
    avancement: { type: String, required: true, default: "0"},
    user: { type: ObjectId, ref: "user", required: true },
    userName: { type: String, required: true },  
});

module.exports = mongoose.model('Car', carschema);