import express from "express";
import models from "../models";


const router = express.Router();

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

router.get("/", getHandler);

router.post("/", postHandler);

const configure = (app) => {
  app.use("/users", router);
};

export default configure;
