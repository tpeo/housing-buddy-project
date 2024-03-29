const firebase = require("./firebase");
const express = require("express");
const { JWT } = require("google-auth-library");
const app = express();
const db = firebase.db;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authMiddleware = require("./auth");

const user = require("./user");
app.use("/user", user.users);
// const auth = require("./auth");
// app.use("/auth", auth.auth);

const review = require("./reviews");
app.use("/review", review.reviews);

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

//get all apartment stats
app.get("/apartments/stats", async(req, res) => {
  const apartments = db.collection("apartment-info");
  const query = await apartments.get();

  //const set = new Set();
  const object = [];
  query.docs.forEach((doc) => object.push({
    "name": doc.data().name,
    "rating": doc.data().rating,
    "cleanliness": doc.data().cleanliness,
    "amenities": doc.data().amenities,
    "management": doc.data().management,
    "parking": doc.data().parking,
    "spaciousness": doc.data().spaciousness,
    "proximity": doc.data().proximity
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

//get apartment stats
app.get("/:apartment/stats", async(req, res) => {
  let apartment = req.params.apartment;
  const apartments = db.collection("apartment-info").doc(apartment);
  const doc = await apartments.get();

  //const set = new Set();
  const object = {
    "rating": doc.data().rating,
    "cleanliness": doc.data().cleanliness,
    "amenities": doc.data().amenities,
    "management": doc.data().management,
    "parking": doc.data().parking,
    "spaciousness": doc.data().spaciousness,
    "proximity": doc.data().proximity
  }

  //const ret = JSON.stringify(Array.from(set));
  res.status(200).json(object);
})

//get apartment info for map feature
app.get("/map-info", async(req, res) => {
  const apartments = db.collection("apartment-info");
  const query = await apartments.get();

  //const set = new Set();
  const object = [];
  query.docs.forEach((doc) => object.push({
    "name": doc.data().name,
    "img_link": doc.data().img_link,
    "address": doc.data().address,
    "coordinates": doc.data().coordinates
  }));

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
   let query = 0;
  if (filter === 'name') {
    query = await apartments.orderBy(filter, 'desc').get();
  } else {
    query = await apartments.orderBy(filter, 'desc').get();
  }

  //const set = new Set();
  const object = [];
  query.docs.forEach((doc) => object.push({name: doc.data().name, img_link: doc.data().img_link}));
  //const ret = JSON.stringify(Array.from(set));
  res.status(200).json(object);
})

app.post("/review/new/:uid", async(req, res) => {
  const body = req.body
  const uid = req.params.uid;
  const apartment = req.body.apartment.name;
    if(body.review == undefined || body.rating == undefined || uid === undefined) {
        return res.json({
          msg: "Error: content not defined in request",
          data: {},
        });
    }

    const r = (Math.random() + 1).toString(36).substring(2);      

    const data = {
        title: req.body.title,
        name: req.body.name,
        review: req.body.review,
        rating: req.body.rating,
        cleanliness: req.body.cleanliness,
        amenities: req.body.amenities,
        management: req.body.management,
        proximity: req.body.proximity,
        spaciousness: req.body.spaciousness,
        parking: req.body.parking,
        tags: req.body.tags,
        likes: 0,
        dislikes: 0,
        flagged: false,
        date: firebase.serverStamp.now(),
        //randomly generate?
        id: r
    }

    //best way to handle this?
    const query = await db.collection("apartment-info").doc(apartment).collection("reviews").doc(data.id).set(data);
    addRating(apartment, data);
    await db.collection("apartment-info").doc(apartment).update({num_reviews: firebase.increment});
    await db.collection("users").doc(uid).update({review: `apartment-info/${apartment}/reviews/${r}`});

    res.status(200).json(`apartment-info/${apartment}/reviews/${r}`);
})

function addRating(name, filters) {
  var apartment = db.collection('apartment-info').doc(name);
  var updateRatings = {
    rating: 0,
    cleanliness: 0,
    amenities: 0,
    management: 0,
    proximity: 0,
    spaciousness: 0,

  }
    // In a transaction, add the new rating and update the aggregate totals
    return db.runTransaction((transaction) => {
        return transaction.get(apartment).then((res) => {
            if (!res.exists) {
                throw "Document does not exist!";
            }
            // Compute new number of ratings
            var newNumRatings = res.data().num_reviews + 1;


            Object.keys(updateRatings).forEach((rating) => {
              var oldRatingTotal = res.data()[rating] * res.data().num_reviews;
              var newAvgRating = (oldRatingTotal + parseInt(filters[rating])) / newNumRatings;
              updateRatings[rating] = newAvgRating;
              
            })
            // Compute new average rating
            // Commit to Firestore
            transaction.update(apartment, updateRatings);
        });
    });
}

app.post("/apartment/", async(req, res) => {

  const body = req.body
    if(body.apartment == undefined || body.location == undefined) {
        return res.json({
          msg: "Error: content not defined in request",
          data: {},
        });
    }

    let r = (Math.random() + 1).toString(36).substring(2);
    const data = {
        name: req.body.name,
        location: req.body.location,
        //randomly generate?
    }
    //create review collection
    //best way to handle this?
    const query = await db.collection("apartment-info").doc(body.apartment).set(data);
    res.status(200).json(query);
})

app.listen(process.env["PORT"], () =>
  console.log("App listening on port " + process.env["PORT"])
);