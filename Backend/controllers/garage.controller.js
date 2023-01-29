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
        element.listReparation.service.forEach(element => 
            element.tasks.map(task => delaiArray.push(task.split("/")[2].trim().split(" ")[0]))
        )
    })
    
    const tempsReparationM = sommeArr(delaiArray) / car.length
    console.log(tempsReparationM)

    // chiffre d'affaire journalier
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let chiffreAffairedArray = []
    let chiffreAffaired = "0"
    const operationDay = await Car.find({ $or: [ 
        { status: "payé" }, 
        { status: "Réparation términé" } 
      ], dateDebut: today.toLocaleDateString() })
    if (operationDay.length === 0) {
        console.log("no operation today")
    } else {
        operationDay.forEach(element => {
            element.listReparation.service.forEach(element => 
                element.tasks.map(task => chiffreAffairedArray.push(task.split("/")[1].trim().split(" ")[0]))
            )
        })
        console.log(sommeArr(chiffreAffairedArray))
        chiffreAffaired = sommeArr(chiffreAffairedArray)
    }



    // chiffre d'affaire mensuel 
    const mois = today.toLocaleDateString().slice(3, 10)
    let chiffreAffairemArray = []
    let chiffreAffairem = "0"
    const operationMonth = await Car.find({ status: "Réparation términé", dateDebut: new RegExp(mois) })
    if (operationMonth.length === 0) {
        console.log("no operation this month")
    } else {
        operationMonth.forEach(element => {
            element.listReparation.service.forEach(element => 
                element.tasks.map(task => chiffreAffairemArray.push(task.split("/")[1].trim().split(" ")[0]))
            )
        })
        console.log(sommeArr(chiffreAffairemArray))
        chiffreAffairem = sommeArr(chiffreAffairemArray)
    }


    // depense 
    let totalDepense = []
    let totalMateriel = []
    let totalSalaire = []

    operationMonth.forEach(element => {
        element.listReparation.piece.tasks.map(task => totalMateriel.push(task.name.split("/")[1].trim().split(" ")[0]))
    })

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

exports.getCarToPayService = async (req, res) => {
    try {

        await Car.find({
            status: "En attente de payement"
        }).then(cars => {
            res.send(cars);
        })

    } catch (error) {
        console.log(error);
    }
}


exports.getCarListInGarage = async (req, res) => {
    try {
        await Car.find({
            sendToGarage: true
        }).then(cars => {
            res.send(cars);
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}

