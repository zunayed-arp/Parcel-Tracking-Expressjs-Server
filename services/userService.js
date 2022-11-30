import models from "../models";



export const saveUser = (user) => {
  const model = new models.User({
    username: body.username,
    created_at: new Date(),
  });
  user
    .save()
    .then((savedUser) => {
    //   res.status(201).send("user saved id: " + savedUser._id);
    return savedUser;
    })
    .catch((error) => {
    //   res.status(500).send(error);
    throw error;
    });
};



