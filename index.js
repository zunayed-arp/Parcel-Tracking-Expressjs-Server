import express from "express";
import models from "./models";
import connectWithDb from "./mongo";

const port = 3000;
const app = express();
app.use(express.json());

const log = (msg) => console.log(msg);

connectWithDb();

const getHandler = (req, res) => {
  res.send("Hello World" + req.query.id);
};

const postHandler = (req, res) => {
  const body = req.body;

  const user = new models.User({
    username: body.username,
    created_at: new Date(),
  });
  user
    .save()
    .then((savedUser) => {
      res.status(201).send("user saved id: " + savedUser._id);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

app.get("/", getHandler);

app.post("/", postHandler);

/**
 * 1. up and running the express server
 * 2. configure the express server
 * 3. handle the routing of the server
 * 
 * use directory import
 * use async await function
 * 
 * 3 layer architecture
 *  ->controller layer: process the http requests
 */

app.listen(port, () => {
  console.log("Listening to port " + port);
});

log(models);
