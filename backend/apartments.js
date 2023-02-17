const firebase = require("./firebase");
const express = require("express");
const cors = require("cors");
const { JWT } = require("google-auth-library");
const app = express();
const db = firebase.db;
const jwt = require('jsonwebtoken');

app.use("/auth", require("./auth").authorize);
const authorize = require("./auth");

require("dotenv").config();

app.use(express.json());
const options = {
  origin: "*",
  methods: "GET, POST, DELETE"
}
app.use(cors(options));
app.options('/apartments/', cors());

//fetch an apartment's ratings
app.get("/apartments/:name", async(req, res) => {
    const apartments = db.collection("apartments");
    let name = req.params.name;
    console.log(name);
    const query = await apartments.where('name', '==', name).get();

    const ret = query.docs.forEach(doc => console.log(doc.data()));
    res.status(200).json(ret);
})

//get all apartment names
app.get("/apartments/", async(req, res) => {
  const apartments = db.collection("apartment-info");
  const query = await apartments.get();

  //const set = new Set();
  const object = [];
  query.docs.forEach((doc) => object.push(doc.data().name));

  //const ret = JSON.stringify(Array.from(set));
  res.status(200).json(object);
})

app.post("/apartments/", cors(), async(req, res) => {

  const body = req.body
    if(body.name == undefined || body.location == undefined || body.rating == undefined) {
        return res.json({
          msg: "Error: content not defined in request",
          data: {},
        });
    }

    //make sure rating is 1-5? or frontend
    let r = (Math.random() + 1).toString(36).substring(2);

    const data = {
        name: req.body.name,
        location: req.body.location,
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