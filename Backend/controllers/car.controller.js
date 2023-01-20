const Car = require('../models/car.model')
const { User } = require('../models/user.model');
const Facture = require('../models/facture.model')




exports.depotCar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(409).send({ message: "User do not Exist!" });

        let repareArray = []
        let price = []
        let delaiArray = []
        req.body.listReparation.forEach(element => {
            const item = {
                tache: element.tache,
                prix: element.prix,
                delai: element.delai
            }
            repareArray.push(item);
            price.push(element.prix)
            delaiArray.push(element.delai)
        });

        let intArray = price.map(str => parseInt(str));
        let finalprice = intArray.reduce((a, b) => a + b);

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const car = new Car({
            ...req.body,
            listReparation: repareArray,
            totalPrix: finalprice,
            user: user._id,
            userName: user.lastName + ' ' + user.firstName,
            dateDepot: today.toLocaleDateString(),
        })
        console.log(car)
        await car.save();

        const facture = new Facture({
            idCar: car._id,
            model: car.model,
            type: car.type,
            matricule: car.matricule,
            listReparation: repareArray,
            totalPrix: finalprice,
            dateDepot: car.dateDepot,
            user: car.user,
            userName: car.userName
        })
        await facture.save()
        return res.status(200).send({ message: 'Votre voiture a été déposer avec succès' });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// function calculateDelay(date1, date2) {
//     var date1Arr = date1.split("/");
//     var date2Arr = date2.split("/");
//     var date1 = new Date(date1Arr[2], date1Arr[1] - 1, date1Arr[0]);
//     var date2 = new Date(date2Arr[2], date2Arr[1] - 1, date2Arr[0]);
//     var diffTemps = Math.abs(date2.getTime() - date1.getTime());
//     var diffJours = Math.ceil(diffTemps / (1000 * 3600 * 24));
//     return diffJours;
// }

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