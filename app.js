import express from "express";
import cors from "cors";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import "dotenv/config"; 
import mongoose from "mongoose";
import session from "express-session";
//To any TAs reading this, I was not able to store local variables for node server app for some reason, so I assigned DB_CONNECTION_STRING explicitly in the .env file.
// I understand this is normally a security risk, and I apologize for the inconvenience
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING|| 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL

}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };

  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
  
app.use(express.json());

Hello(app); 
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);