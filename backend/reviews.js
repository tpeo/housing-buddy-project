const express = require("express");
const path = require("path");
const fs = require("fs");
const firebase = require("./firebase");
const db = firebase.db;
const cors = require('cors');
const bucket = require("./firebase.js").bucket;

require("dotenv").config();

// Route Handler
const reviews = express.Router();
reviews.use(cors());
reviews.use(express.json())

//fetch an apartment's reviews
reviews.get("/:apartment", async(req, res) => {
  let apartment = req.params.apartment;
  const apartments = db.collection("apartment-info").doc(apartment).collection("reviews");
  // const query = await apartments.where('apartment', '==', apartment).get();
  const query = await apartments.orderBy("likes", 'desc').get();
  const reviews = [];
  const ret = query.forEach((doc) => reviews.push(doc.data()));
  res.status(200).json(reviews);
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
reviews.get("/:apartment/:filter", async(req, res) => {
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

//update likes and dislikes for a review
reviews.put("/likes", async(req, res) => {

  const body = req.body
  console.log(body)
    if(body.id == undefined || body.apartment == undefined) {
        return res.json({
          msg: "Error: review not defined in request",
          data: {},
        });
    }

  const apartment = body.apartment;
  
  const query = await db.collection("apartment-info").doc(apartment).collection("reviews").doc(body.id).update({likes: firebase.increment});

  res.status(200).json(query);
})

reviews.put("/dislikes", async(req, res) => {

  const body = req.body
    if(body.id == undefined || body.apartment == undefined) {
        return res.json({
          msg: "Error: review not defined in request",
          data: {},
        });
    }

  const apartment = body.apartment;
  
  const query = await db.collection("apartment-info").doc(apartment).collection("reviews").doc(body.id).update({dislikes: firebase.increment});

  res.status(200).json(query);
})

module.exports = {reviews};