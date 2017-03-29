"use strict";
import ApiError from "../util/apiError";

function mwErrorHandler(err, req, res, next) {
  console.log("Error on request %d %s %s: ", process.domain.id, req.method, req.url);
  console.log("Error Stack: ", err.stack);

  if (err instanceof Error) {
    res.status(500).send("Internal Server Error");
  } else if (err instanceof ApiError) {
    res.status(err.statusCode).send(err);
  }
  next();
}

export default mwErrorHandler;
