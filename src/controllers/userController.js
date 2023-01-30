import express from "express";
import {
  saveUser,
  getAllUsers,
  update,
  deleteById,
} from "../services/userService";

import validators from "../models/view-models";

import { handleValidation } from "../middlewares/handleValidations";

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    return next(error, req, res);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    res.status(200).send(user);
  } catch (error) {
    return next(error, req, res);
  }
};




const postHandler = async (req, res, next) => {
  try {
    // console.log(req.body);
    const body = req.body;
    const user = await saveUser(body);
    res.status(201).send(user._id);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await update(body);
    res.status(200).send({ user: user.username, id: user._id });
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  /**
   * if result is an error, handle the error
   * else return success message
   */
  // console.log(req.params.id);
  try {
    const id = req.params.id;
    const result = await deleteById(id);
    if (result instanceof Error) {
      // const code = result.getCode();
      // res.status(code).send(result.message);
      return next(result, req, res);
    } else {
      res.status(200).send("User deleted");
    }
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/", getHandler);
router.get("/:id", getByIdHandler);

router.post("/", handleValidation(validators.userSchemaValidate), postHandler);

router.put("/", putHandler);

router.delete("/:id", deleteHandler);

const configure = (app) => {
  app.use("/users", router);
};

export default configure;
