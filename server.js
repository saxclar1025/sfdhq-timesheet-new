const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var session = require("express-session");
var passport = require("./config/passport");
const path = require("path");

var app = express();
const PORT = process.env.PORT || 8080;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static("public"));
//if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
//}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/sfdhq";

mongoose.connect(MONGODB_URI);

var db = require("./models");

app.use(session({ secret: "scuba", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes")(app, db);

app.listen(PORT, ()=>{
  console.log(`App running on port ${PORT}!`);
});