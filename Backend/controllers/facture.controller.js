const Car = require('../models/car.model')
const { User } = require('../models/user.model');
const Facture = require('../models/facture.model')

function addDays(date, days) {
  const parts = date.split("/");
  const d = new Date(parts[2], parts[1] - 1, parts[0]);
  d.setDate(d.getDate() + days);
  const newDate = d.getDate().toString().padStart(2, '0') + "/" + (d.getMonth() + 1).toString().padStart(2, '0') + "/" + d.getFullYear();
  return newDate;
}

exports.confirmePay = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id)
    if (!facture)
      return res.status(404).send({ message: "Facture not found" })

    const car = await Car.findById(facture.idCar)
    if (!car)
      return res.status(404).send({ message: "Car not found" })

    let delaiArray = []
    facture.listReparation.map((data) => delaiArray.push(data.delai))

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    let sommedelai = delaiArray.map(str => parseInt(str));
    let totaldelai = sommedelai.reduce((a, b) => a + b);

    await Facture.updateOne({ _id: facture._id }, { $set: { statue: true, dateDebut: today.toLocaleDateString(), dateSortie: addDays(today.toLocaleDateString(), totaldelai) } })
    await Car.updateOne({ _id: car._id }, { $set: { dateDebut: today.toLocaleDateString(), dateSortie: addDays(today.toLocaleDateString(), totaldelai) } })

    return res.status(200).send({ message: "Facture payé avec succè !" })

  }

  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
}