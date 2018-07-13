const bcrypt = require("bcrypt-nodejs");
var passport = require("passport");
var Strategy = require('passport-local').Strategy;

module.exports = (app, db) => {
  passport.use( new Strategy(
    function(username, password, cb) {
      db.User.findOne({"username":username}, (err,user)=> {
        if(err) console.log(err);
        
        console.log(user.validPassword(password));
        if (!user) { return cb(null, false); }
        if (!user.validPassword(password)) { return cb(null, false); }
        return cb(null, user);
      });
    })
  );

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(`login successful, user: ${req.user}`);
  });

  app.get("/api/users", (req, res)=>{
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