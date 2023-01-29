const Car = require("../models/car.model");
const Token = require("../models/token.model");

const jwt = require("jsonwebtoken");

function sommeArr(arr) {
    let convertstr = arr.map(str => parseInt(str));
    let somme = convertstr.reduce((a, b) => a + b);
    return somme
}

function addDays(date, days) {
    const parts = date.split("/");
    const d = new Date(parts[2], parts[1] - 1, parts[0]);
    d.setDate(d.getDate() + days);
    const newDate = d.getDate().toString().padStart(2, '0') + "/" + (d.getMonth() + 1).toString().padStart(2, '0') + "/" + d.getFullYear();
    return newDate;
}

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const verify = (token) => {
    return jwt.verify(token, process.env.JWTPRIVATEKEY, (err, validToken) => {
        if (err) {
            return "Error";
        } else {
            return validToken;
        }
    });
};

exports.Sockets = (socket) => {
    console.log("Socket server work succefuly");

    socket.on("confirm payement", async (data) => {
        
        await Car.findOneAndUpdate({
            _id: data._id
        }, {
            $set: new Car({ ...data })
        })

        const car = await Car.findById(data._id)
        console.log(car)
        let delaiArr = []
        car.listReparation.service.forEach(element => 
            element.tasks.map(task => delaiArr.push(task.split("/")[2].trim().split(" ")[0]))
        )
        

        const car1 = await Car.findOneAndUpdate({
            _id: data._id
        }, {
            $set: {
                dateDebut: today.toLocaleDateString(),
                dateSortie: addDays(today.toLocaleDateString(), sommeArr(delaiArr))
            }
        }).then(data => data);
        console.log("payement confirmé")

        socket.broadcast.emit("new", data);

    });


    socket.on("confirm", async (data) => {
        const car = await Car.findOneAndUpdate({
            _id: data._id
        }, {
            $set: new Car({ ...data }),
        }).then(data => {
            return data;
        })

        socket.broadcast.emit("payement", data);

    })


    socket.on("send service", async (data) => {

        let depenseArr = []
        let totalPrixArr = []
        
        data.historique = data.historique.concat({ ...data.listReparation, dateDepot: data.dateDepot })

        await Car.findOneAndUpdate({
            _id: data._id
        }, {
            $set: new Car({ ...data }),
        })

        const car = await Car.findById(data._id)
        car.listReparation.piece.tasks.map(task => depenseArr.push(task.split("/")[1].trim().split(" ")[0]))
        car.listReparation.service.revision.tasks.map(task => totalPrixArr.push(task.split("/")[1].trim().split(" ")[0]))
        car.listReparation.service.entretien.tasks.map(task => totalPrixArr.push(task.split("/")[1].trim().split(" ")[0]))
        car.listReparation.service.reparation.tasks.map(task => totalPrixArr.push(task.split("/")[1].trim().split(" ")[0]))

        const car1 = await Car.findOneAndUpdate({
            _id: data._id
        }, {
            $set: {totalPrix: sommeArr(totalPrixArr), prixMateriel: sommeArr(depenseArr)},
        }).then(data => {
            return data;
        })
        console.log("done .....", car1)

        socket.broadcast.emit("list reparation", data);

    })

    socket.on("add", async (data) => {
        const userId = verify(data.token)._id;
        const carToUpToDate = data.data;

        const newCar = new Car({
            ...data,
            user: userId
        })

        await newCar.save()
        socket.emit("new", newCar);
    });

    socket.on("send to garage", async (data) => {
        const userId = verify(data.token)._id;
        const carToUpToDate = data.data;
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed).toLocaleDateString();

        const car = new Car({
            ...carToUpToDate,
            status: "En attente",
            sendToGarage: true,
            user: carToUpToDate.user,
            dateDepot: today,
        })


        const carSendToGarage = await Car.findOneAndUpdate({
            _id: car._id
        }, {
            $set: new Car({
                ...carToUpToDate,
                status: "En attente",
                sendToGarage: true,
                user: carToUpToDate.user,
                dateDepot: today,
            })
        }).then(data => {

            if (data.sendToGarage) {
                return data;
            } else {
                return new Car({
                    ...carToUpToDate,
                    status: "En attente",
                    sendToGarage: true,
                    user: carToUpToDate.user,
                    dateDepot: today,
                })
            }
        }).catch(err => {
            console.log("Error ...");
        });

        socket.broadcast.emit('data load', carSendToGarage);
    });

    socket.on('login', async data => {

        let user = await User.findOne({ email: data.email });
        let dataToSend = ""
        if (user) {
            if (user.isRA) {
                dataToSend = 'Responsable Atelier'
            } else if (user.isRF) {
                dataToSend = 'Responsable Financier'
            } else {
                dataToSend = 'Customer'
            }
        } else {
            dataToSend = false;
        }
        socket.on('confirm', dataToSend);
    });

    socket.emit('data', async () => {
        try {
            console.log('data emitted work')
            const data = await Car.find({
                sendToGarage: true
            }).then((data) => {
                return data;
            })
            console.log(data);
            return data;
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("message", mess => {
        console.log(mess)
    });

}

