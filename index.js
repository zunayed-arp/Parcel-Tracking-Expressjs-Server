import express from "express";
import configure from "./controllers";
import connectWithDb from "./mongo";
import { handleErrors } from "./middlewares/handleErrors";
import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch";

const port = 3000;
const app = express();

app.use(express.json());

// const log = (msg) => console.log(msg);

const processRequest = async (req, res, next) => {
  let correlationId = req.headers["x-correlation-id"];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers["x-correlation-id"] = correlationId;
  }
  res.set("x-correlation-id", correlationId);
  return next();
};

app.use(processRequest);

connectWithDb();

const getMessage = (req,res)=>{
  let obj = {
    correlationId: req.headers['x-correlation-id'],
    requestBody: req.body
  };
  return JSON.stringify(obj);
}

const infoLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(winston.format.colorize(),winston.format.json()),
  meta: true,
  msg:"this is a log {{req.method}}"
})

app.use(infoLogger);

configure(app);

//middleware
app.use(handleErrors);

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
