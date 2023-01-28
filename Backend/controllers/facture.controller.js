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

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

exports.confirmeCommande = async (req, res) => {
  try {
      const car = await Car.findById(req.params.id)
      if (!car)
          return res.status(404).send({ message: "Car not found" })

      const user = await User.findById(car.user)

      await Car.updateOne({_id: car._id}, {$set: {dateDepot: today.toLocaleDateString(), confirmationList: true , status: "En attente de payement"}})
      const facture = new Facture({
          idCar: car._id,
          model: car.model,
          type: car.type,
          matricule: car.matricule,
          listReparation: car.listReparation,
          materiel: car.materiel,
          prixMateriel: car.prixMateriel,
          totalPrix: car.totalPrix,
          dateDepot: today.toLocaleDateString(),
          dateEcheance: addDays(today.toLocaleDateString(), 7),
          user: user._id,
          userName: user.fullName
      })
      await facture.save()

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
    await Car.updateOne({_id: facture.idCar}, {$set: {status: "Payement envoyé"}})
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

    await Facture.updateOne({ _id: facture._id }, { $set: { 
      confirmePayement: true , 
      dateDebut: today.toLocaleDateString(), 
      dateSortie: addDays(today.toLocaleDateString(), totaldelai) 
    }})
    await Car.updateOne({ _id: car._id }, { $set: {
      sendToGarage: true,
      dateDebut: today.toLocaleDateString(), 
      dateSortie: addDays(today.toLocaleDateString(), totaldelai),
      status: "En cours de réparation" 
    }})

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

exports.updateAllFacture = async (req, res) => {
  try {
    const facture = await Facture.find({})
    
    facture.map(element => console.log(convertDateToMilliseconds(element.dateEcheance))) 

    facture.filter(element => convertDateToMilliseconds(element.dateEcheance) < Date.now() && element.recuPayement == false).map(async (item) => {
      await Facture.findByIdAndDelete(item._id)
      await Car.findByIdAndDelete(item.idCar)
    })  
    return res.status(200).send({ message: "Facture update" })
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
}

exports.getAllFacture = async (req, res) => {
  try {
    const facture = await Facture.find({})
    
    return res.status(200).send({ data: facture })
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
}