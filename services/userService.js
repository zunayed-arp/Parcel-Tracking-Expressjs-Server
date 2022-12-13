import models from "../models";
import { NotFound } from "../utils/error";

export const saveUser = async (user) => {
  const model = new models.User({
    username: user.username,
    created_at: new Date(),
  });

  const savedUser = await model.save();

  return savedUser;
};

export const getAllUsers = async () => {
  const User = models.User;
  console.log("user", User);
  const users = await User.find();

  return users;
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
  if (model){
    let result = await User.deleteOne({_id:id});
    return result;
  }
  return new NotFound("User not found by id: " + id);
};
