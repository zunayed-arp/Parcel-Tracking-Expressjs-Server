import models from "../../models";

let users = [
        {
          _id: "1",
          username: "test001",
        }
];


export const getAllUsers = async () => {

  return users;
};

export const saveUser = async (user) => {
  const model = new models.User(user);
  model._id = '2';
  users.push(model);
  return model;
};
