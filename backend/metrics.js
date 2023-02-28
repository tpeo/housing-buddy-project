const firebase = require("./firebase");
const express = require("express");
const { JWT } = require("google-auth-library");
const app = express();
const db = firebase.db;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authMiddleware = require("./auth");

// const review = require("./review");
// app.use("/review", review);

require("dotenv").config();

const metrics = express.Router();
app.options('/metrics/');
app.use(cors());

