const express = require('express');
const consign = require('consign');
const cors = require('cors');

const customApp = () => {
  const app = express();
  const opcoesCors = {
    origin: [/localhost/],
  };

  // Middlewares.
  app.use(express.json());
  app.use(cors(opcoesCors));

  // Controllers.
  consign().include('./src/controllers').into(app);

  return app;
}

module.exports = customApp;
