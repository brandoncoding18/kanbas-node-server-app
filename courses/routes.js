import Database from "../Database/index.js";
function CourseRoutes(app) {
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses
      .find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });

  app.put("/api/courses/:id/:name/:number/:startDate/:endDate", (req, res) => {
    const {id, name, number, startDate, endDate} = req.params; 
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { name : name, number : number, startDate : startDate, endDate : endDate  } : c
    );
    res.sendStatus(204);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses
      .filter((c) => c._id !== id);
    res.sendStatus(204);
  });
  app.post("/api/courses/:name/:number/:startDate/:endDate", (req, res) => {
    const {name, number, startDate, endDate} = req.params; 
    const course = {
      _id: new Date().getTime().toString() ,
      name : name,
      number : number, 
      startDate : startDate, 
      endDate : endDate
    
    };
    Database.courses.push(course);
    res.send(course);
  });

      
  app.get("/api/courses", (req, res) => {
    console.log(req.body)
    const courses = Database.courses;
    res.send(courses);
  });
}
export default CourseRoutes;