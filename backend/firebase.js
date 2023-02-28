const admin = require('firebase-admin');

//var serviceAccount = require("./serviceKey.json");
var { getStorage } = require("firebase-admin/storage");
const serverStamp = admin.firestore.Timestamp;
const functions = require('firebase-functions');
require("dotenv").config();

const serviceAccount = JSON.parse(process.env.SERVICE_KEY)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://housing-buddy-402b5.firebaseio.com'
});

// [START aggregate_function]
exports.aggregateRatings = functions.firestore
    .document('apartment-info/lark/')
    .onWrite(async (change, context) => {
      // Get value of the newly added rating
      const ratingVal = change.after.data().rating;

      // Get a reference to the restaurant
      const restRef = db.collection('apartment-info').doc(context.params.restId);

      // Update aggregations in a transaction
      await db.runTransaction(async (transaction) => {
        const restDoc = await transaction.get(restRef);
        
        // Compute new number of ratings
        const newNumRatings = restDoc.data().num_reviews + 1;

        // Compute new average rating
        const oldRatingTotal = restDoc.data().rating * restDoc.data().num_reviews;
        const newAvgRating = (oldRatingTotal + ratingVal) / newNumRatings;

        // Update restaurant info
        transaction.update(restRef, {
          rating: newAvgRating,
          num_reviews: newNumRatings
        });
      });
    });
// [END aggregate_function]

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment(1);
module.exports = {db, serverStamp, increment};