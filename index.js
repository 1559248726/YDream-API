const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./config/express');

const mongoUri = config.mongoUrl;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, (err) => {
  if (err) {
    throw new Error(`  Unable to connect to database: ${mongoUri}`);
  }
  console.log("  Connect mongodb success");
});

if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`  Server started on port ${config.port} (${config.env})`);
  });
}

module.exports = app;
