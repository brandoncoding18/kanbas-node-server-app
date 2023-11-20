import Database from "../Database/index.js";

function ModuleRoutes(app) {
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = Database.modules.findIndex(
          (m) => m._id === mid);
        Database.modules[moduleIndex] = {
          ...Database.modules,
          ...req.body
        };
        res.sendStatus(204);
      });
    
    app.delete("/api/modules/:mid", (req, res) => {
      console.log("test")
        const { mid } = req.params;
        Database.modules = Database.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
      });
    
    app.post("/api/courses/:cid/modules", (req, res) => {
      console.log("test")
        const { cid } = req.params;
        const newModule = {
          _id: new Date().getTime().toString(),
          course: cid,
          ...req.body,
        };
        Database.modules.push(newModule);
        res.send(newModule);
      });

  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = Database.modules
      .filter((m) => m.course === cid);
    res.send(modules);
  });
}
export default ModuleRoutes;