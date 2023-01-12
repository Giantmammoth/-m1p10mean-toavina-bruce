const Car =  require ('../models/car.model')
const {User} = require('../models/user.model');

exports.depotCar = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(409).send({ message: "User do not Exist!" }); 
        
        let repareArray = []
        let price = []
        req.body.listReparation.forEach(element => {
            const item = {
                descri : element.descri,
                prix : element.prix
            }
            repareArray.push(item);
            price.push(element.prix)
        });

        let intArray = price.map(str => parseInt(str));
        let finalprice  = intArray.reduce((a, b) => a + b);

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const car = new Car ({
            ...req.body,
            listReparation: repareArray,
            totalPrix: finalprice,
            user: user._id,
            userName: user.lastName + ' ' + user.firstName,
            dateDepot:  today.toLocaleDateString()
        })
        console.log(car)
        await car.save();
        return res.status(200).send({message: 'Votre voiture a été déposer avec succès'});
    }
    catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}