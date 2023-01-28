const Car = require("../models/car.model");
const Token = require("../models/token.model");

const jwt = require("jsonwebtoken");

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

    socket.on("send service", async (data) => {

        data.historique = data.historique.concat({ ...data.listReparation, dateDepot: data.dateDepot })

        const car = await Car.findOneAndUpdate({
            _id: data._id
        }, {
            $set: new Car({ ...data }),
        }).then(data => {
            return data;
        })
        console.log("done .....", car)

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

