import express from "express";
import configure from "./controllers";
import { handleErrors } from "./middlewares/handleErrors";
import connectWithDb from "./mongo";

const port = 3000;
const app = express();

app.use(express.json());

// const log = (msg) => console.log(msg);

connectWithDb();

configure(app);

//middleware
app.use(handleErrors());

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
 * use async awaiimport { handleErrors } from './middlewares/handleErrors';
t function
 *
 * 3 layer architecture
 *  userController=->controller layer: process the http requests
 *  userService=->service layer: process the object and send to data layer
 *  mongoose wrapper=-> data layer: process the data and get/set it to database
 * 
 * query: localhost:3000/users?id=100(if parameter is dynamic,then query is preferable to use)
 * params: localhost:3000/users/100(if its not dynamic params is the good enough to use)
 */
