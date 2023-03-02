const functions = require("firebase-functions");
const admin = require('firebase-admin');
const db = admin.firestore();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// [START aggregate_function]
exports.aggregateRatings = functions.firestore
    .document('apartment-info/lark')
    .onWrite(async (change, context) => {
      // Get value of the newly added rating
      const ratingVal = change.after.data().rating;
        console.log("hello")
      // Get a reference to the restaurant
      //const restRef = db.collection('apartment-info').doc(context.params.restId);
      const restRef = db.collection('apartment-info').doc('lark');

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
        });
      });
    });
// [END aggregate_function]
