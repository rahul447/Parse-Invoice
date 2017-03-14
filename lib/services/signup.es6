import {Strategy} from "passport-local";
import User from "../models/user";
import bCrypt from "bcrypt-nodejs";

let createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = (passport) => {
  passport.use('signup', new Strategy({passReqToCallback : true }, (req, username, password, done) => {

      function findOrCreateUser() {
        // find a user in Mongo with provided username
        User.findOne({ 'username' :  username },(err, user) => {
          if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          if (user) {
            console.log('User already exists with username: '+username);
            return done(null, false, {"message":"User Already Exists"});
          } else {
            let newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.param('email');
            newUser.firstName = req.param('firstName');
            newUser.lastName = req.param('lastName');

            newUser.save((err) => {
              if (err){
                console.log('Error in Saving user: '+err);
                throw err;
              }
              console.log('User Registration successfull');
              return done(null, newUser);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    }
  ));
};
