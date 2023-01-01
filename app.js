import express from "express";
import configure from "./controllers";
import { connectWithDb, uri } from "./mongo";
import { infoLogger,errorLogger } from "./logger";
import { handleError,handleRequest,handleValidation } from './middlewares/index';





const app = express();

app.use(express.json());

// const log = (msg) => console.log(msg);


app.use(handleRequest);

connectWithDb();

app.use(infoLogger);

configure(app);

app.use(errorLogger(uri));

//middleware
app.use(handleError);


export default app;

