import models from "../../models";

let users = [
  {
    _id: "1",
    username: "test001",
  },
];

export const getAllUsers = async () => {
  return users;
};

export const saveUser = async (user) => {
  const model = new models.User(user);
  console.log('model',model)
  users.push(model);
  return model;
};


export const getUserById = async (id) =>{
  let model = await users.find(x =>x._id == id)
  return model;
};
