"use strict";

// eslint disable no-var

var environmentVariables = require("./environmentVariables"),
  config = {
    "http": {
      "protocol": "http",
      "domain": "127.0.0.1",
      "port": 8060
    },
    "appName": "parse-invoice",
    "folderName": environmentVariables.FOLDER,
    "outFile": environmentVariables.OUTPUTFILE,
    "rootPath": environmentVariables.PROJECT_DIR,
    "nodeEnv": environmentVariables.NODE_ENV
  };

module.exports = config;

// eslint enable no-var
