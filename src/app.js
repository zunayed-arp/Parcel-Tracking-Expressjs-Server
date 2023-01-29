import express from "express";
import configure from "./controllers";
import { handleError, handleRequest } from "./middlewares/index";
import dotenv from "dotenv";
import { infoLogger } from "./logger";

dotenv.config();

const app = express();

app.use(express.json());

app.use(handleRequest);

if (process.env.ENVIRONMENT != "TEST") {
  app.use(infoLogger);
}

configure(app);

app.use(handleError);

export default app;
