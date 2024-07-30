import winston from "winston";
const logger = winston.createLogger({
   level: "info",
   format: winston.format.json(),
   defaultMeta: { service: "request-logging" },
   transports: [new winston.transports.File({ filename: "logs.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
   if (!(req.url.includes("signUp") || req.url.includes("signIn"))) {
      const logdata = `${req.url}-${JSON.stringify(req.body)}`;
      logger.info(logdata);
   }
   next();
};

export default loggerMiddleware;
