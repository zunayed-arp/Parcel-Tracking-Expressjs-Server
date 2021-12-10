import models from "../models"

export const saveUser = async (user) => {
	const model = new models.User({ username: user.username, createdAt: new Date() });
	const savedUser = await model.save();
	return savedUser;
};

export const getAllUsers = async () => {
	const User = models.User;
	const users = await User.find();
	return users;
};


export const update = async (user) => {
	const id = user._id
	const User = models.User;
	let model = await User.findById(id);
	if (model) {
		model.username = user.username;
		model.save();
		return model;
	};

	return null;
};


export const deleteById = async (id) => {
	const User = models.User;
	/**
	 * if the user is not null, delete it
	 * return user not found
	 */
	let model = await User.findById(id);
	if (model) {
		let result = await User.deleteOne({ _id: id });
		return result;
	};

	return new Error('User not found by the id: ' + id);
}


