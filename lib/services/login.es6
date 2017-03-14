import {Strategy} from "passport-local";
import User from "../models/user";
import bCrypt from "bcrypt-nodejs";

let isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

let callback = (req, username, password, done) => {
  // check in mongo if a user with username exists or not
  User.findOne({ 'username' :  username }, (err, user) => {
      if (err)
        return done(err);
      if (!user){
        console.log(`User Not Found with username ${username}`);
        return done(null, false, {"message":"User Not found."});
      }
      if (!isValidPassword(user, password)){
        console.log('Invalid Password');
        return done(null, false, {"message":"Invalid Password."});
      }
      return done(null, user);
    }
  );
};

module.exports = (passport) => {
  passport.use('login', new Strategy({passReqToCallback : true}, callback));
};