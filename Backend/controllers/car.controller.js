const Car = require('../models/car.model');
const Token = require('../models/token.model');
const { User } = require('../models/user.model');
const Facture = require('../models/facture.model');
const sendMail = require('../middleware/sendmail');
const socket = require('../server');

function addDays(date, days) {
    const parts = date.split("/");
    const d = new Date(parts[2], parts[1] - 1, parts[0]);
    d.setDate(d.getDate() + days);
    const newDate = d.getDate().toString().padStart(2, '0') + "/" + (d.getMonth() + 1).toString().padStart(2, '0') + "/" + d.getFullYear();
    return newDate;
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
                    listReparation: [],
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

exports.depotCar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(409).send({ message: "User do not Exist!" });

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const car = new Car({
            ...req.body,
            user: user._id,
            dateDepot: today.toLocaleDateString(),
        })
        await car.save();
        return res.status(200).send({ message: 'Votre voiture a été déposer avec succès' });

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
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
        let delaiArray = []
        req.body.listReparation.forEach(element => {
            const item = {
                tache: element.tache,
                prix: element.prix,
                delai: element.delai
            }
            repareArray.push(item);
            price.push(item.prix)
            delaiArray.push(item.delai)
        });
        req.body.materiel.forEach(element => {
            const item = {
                materiel: element.materiel,
                prix: element.prix
            }
            materielArray.push(item)
            prixMat.push(item.prix)
        })

        let intArray = price.map(str => parseInt(str));
        let finalprice = intArray.reduce((a, b) => a + b);

        await Car.updateOne({ _id: req.params.id }, { $set: { listReparation: repareArray, totalPrix: finalprice } })
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
    try {
        const car = await Car.findById(req.params.id)
        if (!car)
            return res.status(404).send({ message: "Car not found" })

        if (car.start == false)
            return res.status(404).send({ message: "Facture non payé" })

        // const timeElapsed = Date.now();
        // const today = new Date(timeElapsed);
        console.log(car.avancement)
        let i = parseFloat(car.avancement);
        console.log(i)
        // const delay = calculateDelay(car.dateDepot, car.dateSortie)
        const delayms = convertDateToMilliseconds(car.dateSortie) - convertDateToMilliseconds(car.dateDepot)
        console.log(delayms)
        const duration = Date.now() - convertDateToMilliseconds(car.dateDepot);
        console.log(duration)

        const interval = setInterval(async () => {
            console.log(`Loading ${i}%`);

            // Save the loading progress to MongoDB
            await Car.updateOne({ _id: req.params.id }, { $set: { avancement: i } })

            if (duration >= delayms || i >= 100) {
                console.log("Complete!");

                // Clear the interval
                clearInterval(interval);
            } else {
                setTimeout(() => {
                    i += (100 / delayms) * (6000); // Increase by the calculated percentage per day
                    i = Math.min(i, 100);
                }, 6000); // 86400000ms = 24 hours
            }


        }, 6000); // 86400000ms = 24 hours

        return res.status(200).send({ message: 'Loading...' });

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}