import models from "../models";

export const saveUser = async (user) => {
  const model = new models.User({
    username: user.username,
    created_at: new Date(),
  });

  const savedUser = await model.save();

  return savedUser;
};
