const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const patient = require("./patient/patient");
const doctor = require("./doctor/doctor");
const patientRegister = require("./patient/register");
const patientLogin = require("./patient/login");
const doctorRegister = require("./doctor/register");
const doctorLogin = require("./doctor/login");

let port = process.env.PORT || 3000;

const localServer = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "voice_based_eprescription",
};

const db = require("knex")({
  client: "mysql",
  connection: {
    host: localServer.host,
    user: localServer.user,
    password: localServer.password,
    database: localServer.database,
  },
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(JSON.stringify("Hello world"));
});

//<--- Patient --->
app.get("/patient", (req, res) => {
  patient.getPatientsList(req, res, db);
});

app.get("/patient/:id", (req, res) => {
  patient.getPatientWithID(req, res, db);
});

app.post("/patient/register", (req, res) => {
  patientRegister.handlePatientRegister(req, res, db);
});

app.post("/patient/login", (req, res) => {
  patientLogin.handlePatientLogin(req, res, db);
});

//<--- Doctor --->
app.get("/doctor", (req, res) => {
  doctor.getDoctorsList(req, res, db);
});

app.get("/doctor/:id", (req, res) => {
  doctor.getDoctorWithID(req, res, db);
});

app.post("/doctor/register", (req, res) => {
  doctorRegister.handleDoctorRegister(req, res, db);
});

app.post("/doctor/login", (req, res) => {
  doctorLogin.handleDoctorLogin(req, res, db);
});

//<--- Main -->
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
