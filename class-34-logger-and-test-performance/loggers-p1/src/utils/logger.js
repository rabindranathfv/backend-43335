import winston from "winston";

const devLogger = winston.createLogger({
  level: "verbose",
  transports: [new winston.transports.Console()],
});

const qaLogger = winston.createLogger({
  level: "verbose",
  transports: [new winston.transports.Console()],
});

const prodLogger = winston.createLogger({
  level: "http",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./errors-prod.log",
      level: "warn",
    }),
  ],
});

const loggersLevels = {
  production: prodLogger,
  qa: qaLogger,
  development: devLogger,
};

export function setLogger(req, res, next) {
  // if (process.env.NODE_ENV === "production") {
  //   req.logger = prodLogger;
  // } else {
  //   req.logger = devLogger;
  // }

  req.logger = loggersLevels[`${process.env.NODE_ENV}`];

  next();
}
