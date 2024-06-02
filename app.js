import express from 'express';
import dotenv from 'dotenv';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import bodyParser from 'body-parser';
import {
  errorHandlerMiddleware,
  handleUncaughtError,
} from './middlewares/errorHandlerMiddleware.js';

import appRouter from './src/csv/routes/csv.routes.js';

// Handle uncaught exceptions
handleUncaughtError();

// Handle environmental variables
const configPath = path.resolve('config', 'uat.env');
dotenv.config({ path: configPath });

// Initialize the app
const app = express();

// Set up EJS for templating
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

// middleware for body-parser
app.use(bodyParser.json()); // parser
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(path.resolve(), 'public')));

// setting layouts
app.use(ejsLayouts);

// setting up routes
app.use('/api/csv-upload', appRouter);

// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

export default app;
