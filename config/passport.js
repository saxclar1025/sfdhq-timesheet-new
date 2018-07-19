var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");
var settings = require("../config/settings");

passport.use( new LocalStrategy(
  function(username, password, cb) {
    User.findOne({"username":username}).then( user=> {
      if (!user) { return cb(null, false); }
      else {
        user.validPassword(password, result=>{
          if(result) {
            cb(null, user);
          }
          else {
            cb(null, false);
          }
        });
      }
    });
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;