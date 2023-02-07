const firebase = require("./firebase");
const express = require("express");
const cors = require("cors");
const { JWT } = require("google-auth-library");
const app = express();
const db = firebase.db;
const jwt = require('jsonwebtoken');


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
    const query = await apartments.where("name", "==", name).get();
    const ret = query.docs.map((data) => data.data());
    res.status(200).json(ret);
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
        rating: req.body.location,
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