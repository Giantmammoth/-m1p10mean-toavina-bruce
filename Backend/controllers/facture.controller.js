const Car = require('../models/car.model')
const { User } = require('../models/user.model');
const Facture = require('../models/facture.model')
const sendMail = require ('../middleware/sendmail')

function addDays(date, days) {
  const parts = date.split("/");
  const d = new Date(parts[2], parts[1] - 1, parts[0]);
  d.setDate(d.getDate() + days);
  const newDate = d.getDate().toString().padStart(2, '0') + "/" + (d.getMonth() + 1).toString().padStart(2, '0') + "/" + d.getFullYear();
  return newDate;
}

exports.confirmeCommande = async (req, res) => {
  try {
      const car = await Car.findById(req.params.id)
      if (!car)
          return res.status(404).send({ message: "Car not found" })

      await Car.updateOne({_id: car._id}, {$set: {confirmationList: true }})
      const facture = new Facture({
          idCar: car._id,
          model: car.model,
          type: car.type,
          matricule: car.matricule,
          listReparation: repareArray,
          totalPrix: finalprice,
          dateDepot: car.dateDepot,
          dateEcheance: addDays(car.dateDepot, 7),
          user: car.user,
          userName: car.userName
      })
      await facture.save()

      const user = await User.findById(facture.user)

      const message = `
Bonjour,
Une facture pour la voiture ${facture.model} ${facture.matricule} a été créer.
Veuillez regler votre facture avant le ${facture.dateEcheance} s'il vous plait.
Bien a vous. 

Garage`
      await sendMail(user.email, `Facture pour ${facture.model} ${facture.matricule}`, message )
      return res.status(200).send({ message: 'Votre voiture a été déposer avec succès' });
  }
  catch (error) {
      console.log(error)
      res.status(500).send({ message: "Internal Server Error" });
  }
}

exports.payement = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id)
    if (!facture)
      return res.status(404).send({ message: "facture not found"})
    
    await Facture.updateOne({_id: facture._id}, {$set: {recuPayement: true}})
    return res.status(200).send({ message: "Facture payé avec succè !" })
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
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

    await Facture.updateOne({ _id: facture._id }, { $set: { confirmePayement: true , dateDebut: today.toLocaleDateString(), dateSortie: addDays(today.toLocaleDateString(), totaldelai) } })
    await Car.updateOne({ _id: car._id }, { $set: {start: true, dateDebut: today.toLocaleDateString(), dateSortie: addDays(today.toLocaleDateString(), totaldelai) } })

    return res.status(200).send({ message: "Facture confirmé !" })

  }

  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
}

function convertDateToMilliseconds(dateString) {
  let dateArr = dateString.split("/");
  let date = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  return date.getTime();
}

exports.getAllFacture = async (req, res) => {
  try {
    const facture = await Facture.find({})

    console.log(Date.now())
    
    facture.map(element => console.log(convertDateToMilliseconds(element.dateEcheance))) 

    facture.filter(element => convertDateToMilliseconds(element.dateEcheance) < Date.now() && element.recuPayement == false).map(async (item) => {
      await Facture.findByIdAndDelete(item._id)
      await Car.findByIdAndDelete(item.idCar)
    })

    const newfacture = await Facture.find({})
    
    return res.status(200).send({ data: newfacture })


  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
}