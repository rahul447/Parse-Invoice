"use strict";

import express from "express";
import bodyParser from "body-parser";
import mwAllowCrossDomain from "./middleware_services/mwAllowCrossDomain";
import mwErrorHandler from "./middleware_services/mwErrorHandler";
import ApiError from "./util/apiError";
import domain from "express-domain-middleware";
import mongoose from "mongoose";
import passport from "passport";
import expressSession from "express-session";
import path from "path";
import favicon from "static-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import initPassport from "./services/init";
import routes from "./routes/index";

let nodeEnv = "local",
  config = Object.freeze(require("../config/" + nodeEnv)),
  app = express();

mongoose.connect(config.mongoDb.connectionString);

app.use(expressSession({secret: config.secretKey}));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon());
app.use(cookieParser());
app.use(logger(nodeEnv));
app.use(domain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mwAllowCrossDomain);
app.use(mwErrorHandler);
app.use('/', routes(passport, config));

// Sets the relevant config app-wise
app.set("port", config.http.port);
app.set("secretKey", config.secretKey);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

initPassport(passport);

app.use(function resourceNotFound(req, res, next) {
  let apiError = new ApiError(req.id, "Error", [`Resource doesn't exists for RequestId ${req.id}`], "", 404);

  next(apiError);
});

// Starts the app
app.listen(app.get("port"), () => {
  console.log(new Date(), "Server has started and is listening on port: " + app.get("port"));
});
