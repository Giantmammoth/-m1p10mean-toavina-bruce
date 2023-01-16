const Car = require('../models/car.model')
const { User } = require('../models/user.model');
const Facture = require('../models/facture.model')

exports.creatFacture = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car)
      return res.status(404).send({ message: "Car not found" })

    const facture = new Facture({
      idCar: car._id,
      model: car.model,
      type: car.type,
      matricule: car.matricule,
      user: car.user,
      userName: car.userName
    })
    console.log(facture)
    await facture.save()
    return res.status(200).send({ message: 'Facture créer avec succes !' });

  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
}

exports.addDoneReparation = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car)
      return res.status(404).send({ message: "Car not found" })

    const facture = await Facture.findOne({ idCar: req.params.id })
    if (!facture)
      return res.status(404).send({ message: "Facture not found" })

    let price = []

    const item = {
      descri: req.params.descri,
      prix: req.params.prix
    }

    let intArray = facture.listReparation.map(str => parseInt(str.prix));
    intArray.push(parseInt(item.prix))
    console.log(intArray)
    let finalprice = intArray.reduce((a, b) => a + b);

    await Facture.updateOne({ _id: facture._id }, { $push: { listReparation: item }, $set: {totalPrix: finalprice} })

    

    return res.status(200).send({ message: 'Facture mise a jour avec succes !' });
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
}