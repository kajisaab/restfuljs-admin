/* eslint-disable @typescript-eslint/no-unsafe-argument */
import swaggerDocs from '@config/swagger';
import AppLogger from '@core/logger';
import requestInterceptor from '@core/middleware/RequestHandler/requestInterceptor';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import http from 'http';
import 'module-alias/register';
import config from './config';
import { StatusCode } from '@common/statucCodeEnum';
import { databaseService } from '@config/db.config';
import routes from 'routes';
import { responseInterceptor } from '@core/middleware/ResponseHandler/responseHandler';
import errorHandler from '@core/middleware/errorHandler';
import { CorsError } from '@core/middleware/errorHandler/corsError';

const app = express();
const logger = new AppLogger();
let RETRY_COUNT = 0;

dotenv.config();

// reuqest interceptor
app.use(requestInterceptor);

// response interceptor
app.use(responseInterceptor);

// Define CORS options
// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://192.168.18.78:3000',
  'http://192.168.1.66:3000'
];

// Define CORS options
const corsOptions = {
  origin: function (origin: any, callback: any) {
    // Check if the origin is included in the allowed origins array
    if (origin !== null || origin !== '' || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new CorsError(`${origin} origin is rejected`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(compression());

app.use(`/${config.version}/` + config.prefix, routes);

swaggerDocs(app, config.port);

app.use('*', (req: Request, res: Response) => {
  res.status(StatusCode.NOT_FOUND).json({
    code: '-1',
    status: 'Not Found',
    data: {
      message: `The requested API route ${req.originalUrl} does not exist.`
    }
  });
});

app.use(errorHandler);

const server = http.createServer(app);

async function dbConnection(): Promise<boolean> {
  try {
    const response = await databaseService.initialize();
    return response.isInitialized;
  } catch (err) {
    if (RETRY_COUNT < config.db.retryCount) {
      logger.error('Database connection failed. Retrying...');
    }
    if (RETRY_COUNT >= config.db.retryCount) {
      logger.error('Database connection failed after retrying');
      server.close(() => {
        process.exit();
      });
    }
    RETRY_COUNT++;
    await dbConnection();
    return false;
  }
}

dbConnection()
  .then(async (res: boolean) => {
    logger.log('Successfully Database connected');
    if (res) {
      server.listen(config.port, (): void => {
        logger.log(`Server start at port ${config.port}`);
      });
    }
  })
  .catch((err) => {
    logger.error(err);
  });
