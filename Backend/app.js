const express = require('express');
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.ConnectString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, x-auth-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'x-auth-token');

  next();
});

app.use(bodyParser.json());

const User = require('./routes/user.route')
app.use("/api/v1/User", User)

const Car = require('./routes/car.route')
app.use("/api/v1/Car", Car)

const Service = require('./routes/service.route')
app.use("/api/v1/Service", Service)

const Facture = require('./routes/facture.route')
app.use("/api/v1/Facture", Facture)

const Garage = require('./routes/garage.route')
app.use("/api/v1/Garage", Garage)

module.exports = app;

