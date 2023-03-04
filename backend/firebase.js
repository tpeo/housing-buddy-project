const admin = require('firebase-admin');

//var serviceAccount = require("./serviceKey.json");
var { getStorage } = require("firebase-admin/storage");
const serverStamp = admin.firestore.Timestamp;
const functions = require('firebase-functions');
require("dotenv").config();

const serviceAccount = JSON.parse(process.env.SERVICE_KEY)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://housing-buddy-402b5.firebaseio.com',
    storageBucket: "gs://housing-buddy-402b5.appspot.com"
});

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment(1);
const bucket = getStorage().bucket();
module.exports = {db, serverStamp, increment, bucket};