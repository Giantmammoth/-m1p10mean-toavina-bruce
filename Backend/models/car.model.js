const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const carschema = mongoose.Schema({
    model: { type: String, required: true },
    type: { type: String, required: true },
    matricule: { type: String, required: true },
    status: { type: String, default: "" },
    listReparation: [Object],
    confirmationList: { type: Boolean, default: false },
    totalPrix: { type: String, required: false, default: "" },
    dateDepot: { type: String, required: false, default: "" },
    dateDebut: { type: String, required: false, default: "" },
    dateSortie: { type: String, required: false, default: "" },
    sendToGarage: { type: Boolean, required: false, default: false },
    avancement: { type: String, required: false, default: "0" },
    user: { type: ObjectId, ref: "user", required: true },
});

module.exports = mongoose.model('Car', carschema);