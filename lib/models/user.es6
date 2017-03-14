import mongoose from "mongoose";

let userModel = {
  id: String,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String
};

module.exports = mongoose.model('User',userModel);