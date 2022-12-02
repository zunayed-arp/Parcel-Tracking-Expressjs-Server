import express from "express";
import configure from "./controllers";
import connectWithDb from "./mongo";

const port = 3000;
const app = express();

app.use(express.json());

// const log = (msg) => console.log(msg);

connectWithDb();

configure(app);

app.listen(port, () => {
  console.log("Listening to port " + port);
});

// log(models);

/**
 * 1. up and running the express server
 * 2. configure the express server
 * 3. handle the routing of the server
 *
 * use directory import
 * use async await function
 *
 * 3 layer architecture
 *  userController=->controller layer: process the http requests
 *  userService=->service layer: process the object and send to data layer
 *  mongoose wrapper=-> data layer: process the data and get/set it to database
 * 
 * query: localhost:3000/users?id=100
 * params: localhost:3000/users/100
 */
