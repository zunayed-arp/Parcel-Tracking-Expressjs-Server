import express from "express";
import configureRoutes from "./controllers";
import { handleError, handleRequest } from "./middlewares/index";
import dotenv from "dotenv";
import { errorLogger, infoLogger } from "./logger";
import { uri } from './mongo';
const swaggerUI = require("swagger-ui-express");

dotenv.config();

const app = express();

app.use(express.json());

app.use(handleRequest);

if (process.env.ENVIRONMENT != "TEST") {
  app.use(infoLogger());
}

configureRoutes(app);

app.use(errorLogger(uri))

app.use(handleError);


const swaggerDocument = require('./swagger.json');
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument));



export default app;
