module.exports = (app,db)=>{
  app.get("/api/entries", (req,res)=>{
    db.Entry.find()
    .then(entries=>{
      res.json(entries);
    });
  });

  app.get("/api/entries/id/:id", (req,res)=>{
    db.Entry.findOne({_id:req.params.id})
    .then(entry=>{
      res.json(entry);
    });
  });

  app.post("/api/entries/user/", (req,res)=>{
    console.log("req.body");
    console.log(req.body);
    var where = {user:req.body.user};
    var dateRange = {};
    if(!!req.body.start) {
      dateRange.$gte = new Date(req.body.start);
    }
    if(!!req.body.end) {
      dateRange.$lte = new Date(req.body.end);
    }
    if(!!dateRange) {
      where.date = dateRange;
    }
    db.Entry.find(where)
    .then(entries=>{
      res.json(entries);
    });
  });

  app.post("/api/entries", (req,res)=>{
    db.Entry.create(req.body, (err,entry)=>{
      if(err) {
        return res.json(err);
      }
      res.json(entry);
    });
  });

  app.post("/api/entries/:id", (req,res)=>{
    db.Entry.findByIdAndUpdate(req.params.id, req.body.update)
    .then(data=>{
      res.json(data);
    });
  });

  app.post("/api/entries/delete", (req,res)=>{
    db.Entry.findByIdAndDelete(req.params.id)
    .then(data=>{
      res.json(data);
    });
  });
}