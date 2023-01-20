const Car = require('../models/car.model')
const { User } = require('../models/user.model');
const Facture = require('../models/facture.model')
const Garage = require('../models/garage.model')


function sommeArr(arr) {
    let convertstr = arr.map(str => parseInt(str));
    let somme = convertstr.reduce((a, b) => a + b);
    return somme
}

exports.statGarage = async (req, res) => {
    try {
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
        const operationDay = await Facture.find({ statue: true, dateDebut: today.toLocaleDateString() })
        if (operationDay.length === 0) {
            console.log("no operation today")
        }else {
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
        if (operationMonth.length === 0){
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
        for (let key in req.body) {
            totalDepense.push(req.body[key]);
        }
        console.log(sommeArr(totalDepense))

        // Benefice 
        const benefice = sommeArr(chiffreAffairemArray) - sommeArr(totalDepense)
        console.log(benefice)

        const garage = new Garage({
            tempsReparation: tempsReparationM,
            chiffreAffaireJour: chiffreAffaired,
            chiffreAffaireMois: chiffreAffairem,
            depense: req.body,
            benefice: benefice
        })
        console.log(garage)

        await garage.save()
        return res.status(200).send({ message: "Nouveau statistique !" })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}