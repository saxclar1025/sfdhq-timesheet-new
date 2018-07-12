module.exports = (app, db) => {
  require("./api-user-routes")(app,db);
  require("./api-course-routes")(app,db);
  require("./api-entry-routes")(app,db);
  require("./http-routes")(app,db);
}