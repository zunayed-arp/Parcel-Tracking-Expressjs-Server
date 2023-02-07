import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import ElasticsearchTransport from "winston-elasticsearch";
// import { uri } from "./mongo";

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
  };
  return JSON.stringify(obj);
};

// const fileInfoTransport = new winston.transports.DailyRotateFile({
//   filename: "log-info-%DATE%.log",
//   datePattern: "yyyy-MM-DD-HH",
// });
// const fileErrorTransport = new winston.transports.DailyRotateFile({
//   filename: "log-error-%DATE%.log",
//   datePattern: "yyyy-MM-DD-HH",
// });

const mongoErrorTransport = (uri) =>
  new winston.transports.MongoDB({
    db: uri,
    metaKey: "meta",
  });

// const HOST = process.env.ELASTICSEARCH_HOST || "localhost";
// console.log('HOST',HOST)

//elasticSearch
// const ElasticsearchOptions = {
//   level: "info",
//   clientOpts: { node: `http://${HOST}:9200` },
//   indexPrefix: "log-parcelkoi",
// };

// const esTransport = new ElasticsearchTransport(ElasticsearchOptions);

export const infoLogger = () =>
  expressWinston.logger({
    transports: [
      // new winston.transports.Console(),
      new winston.transports.DailyRotateFile({
        filename: "log-info-%DATE%.log",
        datePattern: "yyyy-MM-DD-HH",
      }),
      // esTransport,
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: getMessage,
  });

export const errorLogger = (uri) =>
  expressWinston.errorLogger({
    transports: [
      // new winston.transports.Console(),
      // new winston.transports.DailyRotateFile({
      //   filename: "log-error-%DATE%.log",
      //   datePattern: "yyyy-MM-DD-HH",
      // }),
      mongoErrorTransport(uri),
      // esTransport,
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: '{"correlationId":"{{req.headers["x-correlation-id"]}}", "error":"{{err.message}}" }',
  });
