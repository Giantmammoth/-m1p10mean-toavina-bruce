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

    socket.on("send to garage", async (data) => {
        const userId = verify(data.token)._id;
        const carSendToGarage = await Car.findOne({
            user: userId,
            matricule: data.matricule
        }).then(data => {
            return data;
        }).catch(err => {
            console.log("Error ...");
        });

        socket.broadcast.emit('data load', carSendToGarage);
    });

    socket.on("message", mess => {
        console.log(mess)
    });

}

