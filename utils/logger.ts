require('dotenv').config();
import winston from 'winston';

const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `log/${process.env.NODE_ENV || 'development'}.log` }),
  ],
});

const logRequest = (err: Error, req: any, res: any, next: any) => {
  if (err) {
    logger.error(err);
  } else {
    logger.info(req);
  }
  next();
}

export default { logger, logRequest };
