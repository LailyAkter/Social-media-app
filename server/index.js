import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js"
const app = express();
// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

app.use(express.static("public"))
app.use('/images',express.static("images"))

// connect mongoose
mongoose
  .connect("mongodb+srv://mern-project:mern-project@cluster0.10l6e4l.mongodb.net/social-media-app?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

  //define a route
app.use("/auth",AuthRoute);
app.use("/user",UserRoute);
app.use("/post",PostRoute);
app.use("/upload",UploadRoute)