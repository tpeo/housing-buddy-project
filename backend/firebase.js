const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(require('serviceAccountKey.json')),
    databaseURL: 'https://housing-buddy-402b5.firebaseio.com'
});

const db = admin.firestore();