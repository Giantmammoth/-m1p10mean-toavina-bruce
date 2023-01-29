const express = require('express');
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cron = require('node-cron');
const garCrtl = require('./controllers/garage.controller');
const carCrtl = require('./controllers/car.controller');
const facCrtl = require('./controllers/facture.controller');

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

cron.schedule('0 0 * * *', () => {
  carCrtl.progressPercentage()
});

const Car = require('./routes/car.route')
app.use("/api/v1/Car", Car)

const Service = require('./routes/service.route')
app.use("/api/v1/Service", Service)

const Facture = require('./routes/facture.route')
app.use("/api/v1/Facture", Facture)

// cron.schedule('0 0 * * *', () => {
//   facCrtl.updateAllFacture()
// });

const Garage = require('./routes/garage.route')
app.use("/api/v1/Garage", Garage)

cron.schedule('0 0 * * *', () => {
  garCrtl.statGarage()
});

const Employer = require('./routes/employer.route')
app.use("/api/v1/Employer", Employer)

module.exports = app;

