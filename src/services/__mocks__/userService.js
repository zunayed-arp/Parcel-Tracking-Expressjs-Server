import models from "../../models";
import { NotFound } from "../../utils/errors";

let users = [
  {
    id: "1",
    username: "test001",
  },
];

export const getAllUsers = async () => {
  return users;
};

export const saveUser = async (user) => {
  const model = new models.User(user);
  console.log("model", model);
  users.push(model);
  return model;
};

export const getUserById = async (id) => {
  let model = users.find((x) => x.id == id);
  return model;
};

export const update = async (user) => {
  users[0].username = user.username;
  return users[0];
};

export const deleteById = async (id) => {
  users[0] = [];
};
