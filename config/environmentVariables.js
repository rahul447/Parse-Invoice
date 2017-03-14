"use strict";

// eslint disable no-var

var environmentVariables = {
  "MONGO_CONNECTION_STRING": process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/chat-app",
  "API_SECRET_KEY": process.env.API_SECRET_KEY || "mySecretKey",
  "BACKEND_URL" : process.env.BACKEND_URL || "http://127.0.0.1:8060",
};

module.exports = environmentVariables;

// eslint enable no-var
