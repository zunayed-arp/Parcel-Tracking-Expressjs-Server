import express from "express";
import models from "./models/index.js";
import mongoose from "mongoose";

const port = 3000;
const app = express();
app.use(express.json());

const log = (msg) => console.log(msg);

const uri = "mongodb://localhost:27017/parcelkoi";
const options = {};

const connectWithDb = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) {
      console.log("error");
    } else log("database connection established");
  });
};

connectWithDb();

app.get("/", (req, res) => {
  res.send("Hello World" + req.query.id);
});

app.post("/", (req, res) => {;
  const body = req.body;

  const user = new models.User({username:body.username,created_at:new Date()});
  user.save().then((savedUser)=>{

    res.status(201).send("user saved id: " + savedUser._id);

  }).catch((error)=>{
    res.status(500).send(error);
  });

  
});

/**
 * 1. up and running the express server
 * 2. configure the express server
 * 3. handle the routing of the server
 *
 */

app.listen(port, () => {
  console.log("Listening to port " + port);
});

log(models);
