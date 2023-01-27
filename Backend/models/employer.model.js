const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const employerschema = mongoose.Schema({
    fullName: { type: String, required: true},
    post: { type: String, required: true},
    salaire: { type: String, required: true},
});

module.exports = mongoose.model('Employer', employerschema);