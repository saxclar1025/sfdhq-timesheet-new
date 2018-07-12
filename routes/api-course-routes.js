module.exports = (app,db)=>{
  app.get("/api/courses", (req,res)=>{
    db.Course.find()
    .then(courses=>{
      res.json(courses);
    });
  });

  app.get("/api/courses/id/:id", (req,res)=>{
    db.Course.findOne({_id:req.params.id})
    .then(course=>{
      res.json(course);
    });
  });

  app.post("/api/courses", (req,res)=>{
    db.Course.create(req.body, (err,course)=>{
      if(err) {
        return res.json(err);
      }
      res.json(course);
    });
  });

  app.post("/api/courses/:id", (req,res)=>{
    db.Course.findByIdAndUpdate(req.params.id, req.body.update)
    .then(data=>{
      res.json(data);
    });
  });

  app.post("/api/courses/delete", (req,res)=>{
    db.Course.findByIdAndDelete(req.params.id)
    .then(data=>{
      res.json(data);
    });
  });
}