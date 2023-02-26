const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bucket = require("./firebase/cred.js").bucket;

app.use("/auth", require("./auth").authorize);
const authorize = require("./auth");

require("dotenv").config();

// Route Handler
const reviews = express.Router();

app.use(express.json());


//fetch an apartment's reviews
app.get("/review/:name", async(req, res) => {
    const apartments = db.collection("apartments");
    let name = req.params.name;
    console.log(name);
    const query = await apartments.where('name', '==', name).get();

    const ret = query.docs.forEach(doc => console.log(doc.data()));
    res.status(200).json(ret);
})
