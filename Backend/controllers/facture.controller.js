const Car =  require ('../models/car.model')
const {User} = require('../models/user.model');
const Facture =  require ('../models/facture.model')

exports.creatFacture = (req, res) => {
    try {

    }
    catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}