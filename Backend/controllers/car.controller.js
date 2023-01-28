const Car = require('../models/car.model');
const Token = require('../models/token.model');
const { User } = require('../models/user.model');
const Facture = require('../models/facture.model');
const sendMail = require('../middleware/sendmail');
const socket = require('../server');


function sommeArr(arr) {
    let convertstr = arr.map(str => parseInt(str));
    let somme = convertstr.reduce((a, b) => a + b);
    return somme
}

exports.getCarList = async (req, res) => {
    try {
        await Car.find({
            user: req.user
        }).then((carlist) => {
            res.status(200).send(carlist);
        }).catch(e => res.status(401).send(e));
    } catch (e) {
        console.log("Error : ", e);
        res.status(500).send({ message: "Internal Server Error" })
    };
}


exports.addNewCar = async (req, res) => {
    try {
        /*  socket.emit('data load', { messeage: 'Responsable Atelier Reception' }); */
        const carAddedInfo = req.body;
        await Car.find({
            matricule: carAddedInfo.matricule,
            user: req.user
        }).then(async (car) => {
            if (car.length === 0) {
                const newCar = new Car({
                    ...carAddedInfo,
                    user: req.user
                });
                await newCar.save();

                /* socket.emit('data load', newCar); */

                res.status(200).send({ data: newCar, message: "Your new car is added succefuly" });
            } else {
                res.send({ message: "this car is already add to your list" });
            }
        }).catch(e => res.status(401).send(e));
    } catch (e) {
        console.log("Error : ", e);
        res.status(500).send({ message: "Internal Server Error" })
    };
}

exports.updateListReparation = async (req, res) => {
    try {

        const car = await Car.findById(req.params.id)
        if (!car)
            return res.status(404).send({ message: "Car not found" })

        let repareArray = []
        let materielArray = []
        let prixMat = []
        let price = []
        req.body.listReparation.forEach(element => {
            const item = {
                tache: element.tache,
                prix: element.prix,
                delai: element.delai
            }
            repareArray.push(item);
            price.push(item.prix)
        });
        req.body.materiel.forEach(element => {
            const item = {
                materiel: element.materiel,
                prix: element.prix
            }
            materielArray.push(item)
            prixMat.push(item.prix)
        })


        await Car.updateOne({ _id: req.params.id }, {
            $set: {
                listReparation: repareArray,
                totalPrix: sommeArr(price),
                materiel: materielArray,
                prixMateriel: sommeArr(prixMat)
            }
        })
        return res.status(200).send({ message: 'Liste réparation envoyé' });

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

exports.progressPercentage = async (req, res) => {
    
        const car = await Car.find({ status: "En cours de réparation" })
        if (!car)
            return res.status(404).send({ message: "Car not found" })

        car.forEach( (car) => {
            let i = parseFloat(car.avancement);
            const delayms = convertDateToMilliseconds(car.dateSortie) - convertDateToMilliseconds(car.dateDebut)
            const duration = Date.now() - convertDateToMilliseconds(car.dateDebut);

            
            
            const interval = setInterval(async () => {
                    console.log(`Loading ${i}%`);
        
                    // Save the loading progress to MongoDB
                    await Car.updateOne({ _id: car._id }, { $set: { avancement: i } })
        
                    if (duration >= delayms || i >= 100) {
                        console.log("Complete!");
        
                        // Clear the interval
                        clearInterval(interval);
                    } else {
                        setTimeout(() => {
                            i += (100 / delayms) * (86400000); // Increase by the calculated percentage per day
                            i = Math.min(i, 100);
                        }, 86400000); // 86400000ms = 24 hours
                    }
                }, 86400000)
            })
        
        // // const timeElapsed = Date.now();
        // // const today = new Date(timeElapsed);
        // console.log(car.avancement)
        // let i = parseFloat(car.avancement);
        // console.log(i)
        // // const delay = calculateDelay(car.dateDepot, car.dateSortie)
        // const delayms = convertDateToMilliseconds(car.dateSortie) - convertDateToMilliseconds(car.dateDepot)
        // console.log(delayms)
        // const duration = Date.now() - convertDateToMilliseconds(car.dateDepot);
        // console.log(duration)

        // const interval = setInterval(async () => {
        //     console.log(`Loading ${i}%`);

        //     // Save the loading progress to MongoDB
        //     await Car.updateOne({ _id: req.params.id }, { $set: { avancement: i } })

        //     if (duration >= delayms || i >= 100) {
        //         console.log("Complete!");

        //         // Clear the interval
        //         clearInterval(interval);
        //     } else {
        //         setTimeout(() => {
        //             i += (100 / delayms) * (6000); // Increase by the calculated percentage per day
        //             i = Math.min(i, 100);
        //         }, 6000); // 86400000ms = 24 hours
        //     }


        // }, 6000); // 86400000ms = 24 hours
    
}