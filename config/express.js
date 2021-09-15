const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const winstonInstance = require('./winston');
const config = require('./config');
const APIError = require('../server/helpers/APIError');
const routes = require('../index.route');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser());
app.use(session({
  resave: false,
  rolling: true,
  saveUninitialized: true,
  secret: config.sessionSecret,
  name: 'SESSION',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2,
  },
}));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on /api path
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

module.exports = app;
