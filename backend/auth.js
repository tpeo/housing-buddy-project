const express = require("express");
const fb = require("firebase-admin");

const firebase = require("./firebase");
const db = firebase.db;
const jwt = require("jsonwebtoken");

const cors = require("cors");
require("dotenv").config();

const authorize = express.Router();
authorize.use(express.json());

const options = {
  origin: "*",
  methods: "GET, POST, DELETE"
}

authorize.use(cors(options));

const auth = (req, res, next) => {
try {
    const tokenId = req.get("Authorization").split("Bearer ")[1];
    return fb
    .auth()
    .verifyIdToken(tokenId)
    .then((decoded) => {
        req.token = decoded;
        next();
    })
    .catch((err) => res.status(401).send(err));
} catch (e) {
    res.status(400).send("Errors");
}
};

//app.listen(4000, () => console.log("App listening on port " + 4000));

module.exports = {authorize, auth};
