const Joi = require('joi');
const path = require('path');

require('dotenv').config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  HOST: Joi.string()
    .default('localhost'),
  PORT: Joi.number()
    .default(4040),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  SESSION_SECRET: Joi.string().required()
    .description('SESSION Secret required to sign'),
  MONGO_URL: Joi.string().required()
    .description('Mongo DB host url')
}).unknown()
  .required();

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  host: envVars.HOST,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  sessionSecret: envVars.SESSION_SECRET,
  mongoUrl: envVars.MONGO_URL,
  upload: {
    storeTo: '/upload/',
    publicPath: '../../public'
  },
  download: {
    storeTo:  path.join(__dirname, '../cache/')
  },
};

module.exports = config;
