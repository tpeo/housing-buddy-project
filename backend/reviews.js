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


//fetch an apartment's reviews
reviews.get("/review/:name", async(req, res) => {
    const apartments = db.collection("apartments");
    let name = req.params.name;
    const query = await apartments.where('name', '==', name).get();

    const ret = query.docs.forEach(doc => console.log(doc.data()));
    res.status(200).json(ret);
})

//fetch a user's reviews
reviews.get("/:user/reviews", async(req, res) => {
    const apartments = db.collection("apartments");
    let name = req.params.name;
    const query = await apartments.where('name', '==', name).get();

    const ret = query.docs.forEach(doc => console.log(doc.data()));
    res.status(200).json(ret);
})

//get reviews sorted for an apartment
app.get("/reviews/:apartment/:filter", async(req, res) => {
    let filter = req.params.filter;
    let apartment = req.params.apartment;
    const reviews = db.collection("apartment-info").doc(apartment).collection("reviews");

    let query = 0;
    if (filter === 'name') {
      query = await reviews.orderBy(filter).get();
    } else {
      query = await reviews.orderBy(filter, 'desc').get();
    }
  
    const object = [];
    query.docs.forEach((doc) => object.push(doc.data()));
    res.status(200).json(object);
  })
