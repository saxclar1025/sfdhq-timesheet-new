const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
//app.use(express.static("public"));
app.use(express.static("client/public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/sfdhq";

mongoose.connect(MONGODB_URI);

var db = require("./models");

require("./routes")(app, db);

app.listen(PORT, ()=>{
  console.log(`App running on port ${PORT}!`);
});