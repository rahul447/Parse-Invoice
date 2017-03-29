"use strict";

import express from "express";
import bodyParser from "body-parser";
import mwAllowCrossDomain from "./middleware_services/mwAllowCrossDomain";
import mwErrorHandler from "./middleware_services/mwErrorHandler";
import ApiError from "./util/apiError";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes/index";
import multer from "multer";
import cluster from "cluster";
import os from "os";

let nodeEnv = "local",
  config = Object.freeze(require("../config/" + nodeEnv)),
  app = express(), destFolder = config.rootPath + config.folderName + "/";

if (cluster.isMaster) {
  let numWorkers = os.cpus().length;
  console.log('Master cluster setting up ' + numWorkers + ' workers...');
  // Fork workers.
  for(let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });

}else{
  app.use(multer({ dest: destFolder}).single('asciifile'));
  app.use(cookieParser());
  app.use(logger(nodeEnv));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(mwAllowCrossDomain);
  app.use(mwErrorHandler);
  app.use('/', routes(config, destFolder));

// Sets the relevant config app-wise
  app.set("port", config.http.port);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');


  app.use(function resourceNotFound(req, res, next) {
    let apiError = new ApiError(req.id, "Error", [`Resource doesn't exists for RequestId ${req.id}`], "", 404);

    next(apiError);
  });

// Starts the app
  app.listen(app.get("port"), () => {
    console.log(new Date(), "Server has started and is listening on port: " + app.get("port") + ' with process '
      + process.pid);
  });
}



module.exports = app; // for testing