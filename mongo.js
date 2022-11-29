import mongoose from "mongoose";


const uri = "mongodb://localhost:27017/parcelkoi";
const options = {};



const log = (msg) => console.log(msg);

const connectWithDb = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) {
      console.log("error");
    } else log("database connection established");
  });
};

export default connectWithDb;
