import models from "../models";
import { NotFound } from "../utils/errors";

export const getAllUsers = async () => {
  const User = models.User;
  console.log("user", User);
  const users = await User.find();

  return users;
};

export const saveUser = async (user) => {

  console.log("saveUser",user)
  const model = new models.User(user);
  console.log("model",model)
  const savedUser = await model.save();

  console.log('savedUser',savedUser)

  return savedUser;
};

export const update = async (user) => {
  const id = user._id;
  const User = models.User;
  let model = await User.findById(id);

  if (model) {
    model.username = user.username;
    model.save();
    return model;
  }

  return null;
};

export const deleteById = async (id) => {
  //remove->obsolote
  //delete one
  //delte many
  const User = models.User;
  let model = await User.findById(id);
  if (model) {
    let result = await User.deleteOne({ _id: id });
    return result;
  }
  return new NotFound("User not found by id: " + id);
};
