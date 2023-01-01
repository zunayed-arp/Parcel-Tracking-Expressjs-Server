import mongoose from "mongoose";

//schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  created_at: { type: Date, required: true },
});

//reference

const User = mongoose.model("User", userSchema);

export default User;
