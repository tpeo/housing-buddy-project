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
  const query = await apartments.orderBy('flagged').orderBy("likes", 'desc').get();
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
      query = await reviews.orderBy('flagged').orderBy(filter).get();
    } else {
      query = await reviews.orderBy('flagged').orderBy(filter, 'desc').get();
    }
  
    const object = [];
    query.docs.forEach((doc) => object.push(doc.data()));
    res.status(200).json(object);
  })

  //filter reviews by tag
reviews.get("/:apartment/tags/:tags/", async(req, res) => {
  let filter = req.params.tags;
  const filter_arr = JSON.parse(filter);
  if (filter === "" || filter === undefined || filter === "[]") {filter = "all"}
  let apartment = req.params.apartment;
  const reviews = db.collection("apartment-info").doc(apartment).collection("reviews");

  const query = await reviews.orderBy('flagged').orderBy('likes', 'desc').get();

  let object = [];
  let set = new Set();
  
  if (filter === "all") {
    query.docs.forEach((doc) => {
      object.push(doc.data());
    });
  } else {
    query.docs.forEach((doc) => {
      for (let filter of filter_arr) {
        if (doc.data().tags.includes(filter) && !object.includes(doc.data())) {
          set.add(doc.data());
          break;
        }
      }
  
    });
  }

  object = Array.from(set);
  res.status(200).json(object);
})

//update likes and dislikes for a review
reviews.put("/likes", async(req, res) => {

  const body = req.body

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

//update flagging
reviews.put("/flag", async(req, res) => {

  const body = req.body
    if(body.id ==undefined || body.apartment == undefined) {
        return res.json({
          msg: "Error: review not defined in request",
          data: {},
        });
    }

  const apartment = body.apartment;
  
  const query = await db.collection("apartment-info").doc(apartment).collection("reviews").doc(body.id).update({flagged: true});

  res.status(200).json(query);
})

reviews.delete("/delete", async(req, res) => {
  const body = req.body;
  if(body.id == undefined || body.apartment == undefined) { //check that review belongs to user
      return res.json({
        msg: "Error: uid not defined in request",
        data: {},
      });
  }

  //delete review
  const review_info = await db.doc(body.review_id).get();
  const metrics = review_info.data();
  deleteRating(body.apartment, metrics);
  //nullify review field for user
  await db.doc(body.review_id).delete(); 
  //update aggregate reviews
  await db.collection("apartment-info").doc(body.apartment).update({num_reviews: firebase.decrement});
  await db.collection("users").doc(body.uid).update({review: null})
  res.status(200).json("Delete Successful");
})

function deleteRating(name, filters) {
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
            if (res.data().num_reviews === 0) return;
            const newNumRatings = res.data().num_reviews - 1;

            Object.keys(updateRatings).forEach((rating) => {
              var oldRatingTotal = res.data()[rating] * res.data().num_reviews;
              var newAvgRating = (oldRatingTotal - parseInt(filters[rating])) / newNumRatings;
              updateRatings[rating] = newAvgRating;
              
            })
            // Compute new average rating
            // Commit to Firestore
            transaction.update(apartment, updateRatings);
        });
    });
}

module.exports = {reviews};