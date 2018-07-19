const bcrypt = require("bcrypt-nodejs");
var settings = require('../config/settings');
var passport = require("../config/passport");

module.exports = (app, db) => {
  app.get("/api/currentuser", function(req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json(req.user);
    }
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json({success:true});
  });

  app.get("/api/users", (req, res)=>{
    //console.log(req.user);
    db.User.find()
    .then(users=>{
      res.json(users);
    });
  });

  app.get("/api/users/id/:id", (req,res)=>{
    db.User.findOne({_id:req.params.id})
    .then(user=>{
      res.json(user);
    });
  });

  //expects and object:
  //{
  //  username: String,
  //  password: String,
  //  [firstName]: String,
  //  [lastName]: String,
  //  email: String,
  //  [phone]: String,
  //  hourlyRate: Number,
  //  [isAdmin]: Boolean (false),
  //  [isCaptain]: Boolean (false),
  //  [isInstructor]: Boolean (false),
  //  [captainRate]: Number,
  //  [crewRate]: Number,
  //  [isPayroll]: Boolean (false)
  //}
  app.post("/api/users", (req,res)=>{
    db.User.create(req.body, (err, user)=>{
      if(err) {
        console.log(err);
        return res.json(err);
      }
      res.json(user);
    });
  });

  app.post("/api/users/:id", (req,res)=>{
    if(!!req.body.update.password) {
      req.body.update.password = bcrypt.hashSync(req.body.update.password, bcrypt.genSaltSync(10), null);
    }
    db.User.findByIdAndUpdate(req.params.id, req.body.update)
    .then(user=>{
      res.json(user);
    });
  });

  app.post("/api/users/delete/:id", (req,res)=>{
    db.User.findByIdAndDelete(req.params.id)
    .then(user=>{
      res.json(user);
    });
  });
}