const firebase = require('./firebase.js');
require('dotenv').config();

const express = require('express');
const app = express();

app.listen(4000, () => {
    console.log('Server running on port 4000');
});