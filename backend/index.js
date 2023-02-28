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

app.use(express.json());
app.options('/apartments/');
app.use(cors());
//auth all routes
//app.use("/", authMiddleware);

//check if user is valid
app.get("/auth", authMiddleware, (req, res) => {
  return res.json({ msg: "Success" });
});

//fetch an apartment's ratings
app.get("/review/:apartment", async(req, res) => {
    let apartment = req.params.apartment;
    const apartments = db.collection("apartment-info").doc(apartment).collection("reviews");
    // const query = await apartments.where('apartment', '==', apartment).get();
    const query = await apartments.get();
    const reviews = [];
    const ret = query.forEach((doc) => reviews.push(doc.data()));
    res.status(200).json(reviews);
})

//get all apartment stats
app.get("/apartments/stats", async(req, res) => {
  const apartments = db.collection("apartment-info");
  const query = await apartments.get();

  //const set = new Set();
  const object = [];
  query.docs.forEach((doc) => object.push({
    "name": doc.data().name,
    "rating": doc.data().rating
  }));

  //const ret = JSON.stringify(Array.from(set));
  res.status(200).json(object);
})

//get all apartment info
app.get("/:apartment/info", async(req, res) => {
  let apartment = req.params.apartment;
  const apartments = db.collection("apartment-info").doc(apartment);
  const query = await apartments.get();

  //const set = new Set();
  const object = {
    "name": query.data().name,
    "link": query.data().link,
    "location": query.data().location
  }

  //const ret = JSON.stringify(Array.from(set));
  res.status(200).json(object);
})

//get all apartment names
app.get("/apartments/", async(req, res) => {
  const apartments = db.collection("apartment-info");
  const query = await apartments.orderBy('rating', 'desc').get(); //default

  //const set = new Set();
  const object = [];
  query.docs.forEach((doc) => object.push(doc.data().name));

  //const ret = JSON.stringify(Array.from(set));
  res.status(200).json(object);
})

//get ratings sorted for apartments
app.get("/apartments/:filter", async(req, res) => {
  let filter = req.params.filter;
  const apartments = db.collection("apartment-info");
  const query = await apartments.orderBy(filter, 'desc').get();

  //const set = new Set();
  const object = [];
  query.docs.forEach((doc) => object.push(doc.data().name));

  //const ret = JSON.stringify(Array.from(set));
  res.status(200).json(object);
})

app.post("/review/", async(req, res) => {

  const body = req.body
    if(body.name == undefined || body.location == undefined || body.rating == undefined) {
        return res.json({
          msg: "Error: content not defined in request",
          data: {},
        });
    }

    let r = (Math.random() + 1).toString(36).substring(2);

    const data = {
        title: req.body.title,
        review: req.body.review,
        rating: req.body.rating,
        //randomly generate?
        id: r
    }

    //best way to handle this?
    const query = await db.collection('apartments').doc(data.id).set(data);
    res.status(200).json(query);
})

app.listen(process.env["PORT"], () =>
  console.log("App listening on port " + process.env["PORT"])
);