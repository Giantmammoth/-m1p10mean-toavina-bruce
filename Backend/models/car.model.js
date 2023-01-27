const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const carschema = mongoose.Schema({
    model: { type: String, required: true },
    type: { type: String, required: true },
    matricule: { type: String, required: true },
    status: { type: String, default: "" },
    listReparation: [Object],
<<<<<<< HEAD
    confirmationList: { type: Boolean, default: false },
    totalPrix: { type: String, required: false, default: "" },
    dateDepot: { type: String, required: false, default: "" },
    dateDebut: { type: String, required: false, default: "" },
    dateSortie: { type: String, required: false, default: "" },
    sendToGarage: { type: Boolean, required: false, default: false },
    avancement: { type: String, required: false, default: "0" },
=======
    materiel: [Object],
    confirmationList : { type: Boolean, default: false },
    prixMateriel: { type: String, required: true, default: "0"},
    totalPrix: { type: String, required: true, default: "0"},
    dateDepot: { type: String, required: true, default: ""},
    dateDebut: { type: String, required: false, default: ""},
    dateSortie: { type: String, required: false, default: ""},
    start : { type: Boolean, default: false },
    avancement: { type: String, required: true, default: "0"},
>>>>>>> 3fdae6a33f9b1866b5dec782bc0d5547e6e6fe04
    user: { type: ObjectId, ref: "user", required: true },
});

module.exports = mongoose.model('Car', carschema);