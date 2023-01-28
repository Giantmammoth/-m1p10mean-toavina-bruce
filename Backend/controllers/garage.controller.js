const Car = require('../models/car.model')
const { User } = require('../models/user.model');
const Facture = require('../models/facture.model')
const Garage = require('../models/garage.model')
const Employer = require("../models/employer.model");
const cron = require('node-cron');

function sommeArr(arr) {
    let convertstr = arr.map(str => parseInt(str));
    let somme = convertstr.reduce((a, b) => a + b);
    return somme
}


exports.statGarage = async (req, res) => {


    const car = await Car.find({})

    // temps de reparation moyen
    let delaiArray = []
    car.forEach(element => {
        element.listReparation.map(data => delaiArray.push(data.delai))
    })
    let sommedelai = delaiArray.map(str => parseInt(str));
    let totaldelai = sommedelai.reduce((a, b) => a + b);
    const tempsReparationM = totaldelai / car.length
    console.log(tempsReparationM)

    // chiffre d'affaire journalier
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let chiffreAffairedArray = []
    let chiffreAffaired = "0"
    const operationDay = await Facture.find({ confirmePayement: true, dateDebut: today.toLocaleDateString() })
    if (operationDay.length === 0) {
        console.log("no operation today")
    } else {
        operationDay.forEach(element => {
            chiffreAffairedArray.push(element.totalPrix)
        })
        console.log(sommeArr(chiffreAffairedArray))
        chiffreAffaired = sommeArr(chiffreAffairedArray)
    }



    // chiffre d'affaire mensuel 
    const mois = today.toLocaleDateString().slice(3, 10)
    let chiffreAffairemArray = []
    let chiffreAffairem = "0"
    const operationMonth = await Facture.find({ statue: true, dateDebut: new RegExp(mois) })
    if (operationMonth.length === 0) {
        console.log("no operation this month")
    } else {
        operationMonth.forEach(element => {
            chiffreAffairemArray.push(element.totalPrix)
        })
        console.log(sommeArr(chiffreAffairemArray))
        chiffreAffairem = sommeArr(chiffreAffairemArray)
    }


    // depense 
    let totalDepense = []
    let totalMateriel = []
    let totalSalaire = []

    operationMonth.forEach(element => totalMateriel.push(element.prixMateriel))

    const salaire = await Employer.find({})
    salaire.forEach(element => totalSalaire.push(element.salaire))



    const sommeSalaire = sommeArr(totalSalaire)
    const sommeMateriel = sommeArr(totalMateriel)
    const loyer = 500000

    totalDepense.push(sommeSalaire, sommeMateriel, loyer)

    const sommeDepense = sommeArr(totalDepense)

    // Benefice 
    let benefice = chiffreAffairem - sommeSalaire - sommeMateriel - loyer

    await Garage.updateOne({ _id: "63cb086d49844a0b7ef5667e" },
        {
            $push: {
                tempsReparation: tempsReparationM,
                chiffreAffaireJour: chiffreAffaired,
                chiffreAffaireMois: chiffreAffairem,
                depense: sommeDepense,
                benefice: benefice
            },
            $set: {
                salaire: sommeSalaire,
                materiel: sommeMateriel,
                loyer: loyer
            }
        });
}


exports.getStat = async (req, res) => {
    try {
        const garage = await Garage.findById("63cb086d49844a0b7ef5667e")

        return res.status(200).send({ data: garage })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}


exports.getCarListInGarage = async (req, res) => {
    try {
        await Car.find({
            sendToGarage: true
        }).then(cars => {
            console.log(cars)
            res.send(cars);
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}

