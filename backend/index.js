import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// route
import blogpostsRoute from "./routes/blogposts.js";
import categoriesRoute from "./routes/categories.js";
import commentsRoute from "./routes/comments.js";
import pagesRoute from "./routes/pages.js";
import settingsRoute from "./routes/settings.js";
import uploadRoute from "./routes/uploadImage.js";
import loginRoute from "./routes/login.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.use("/api/blogposts", blogpostsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/pages", pagesRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/login", loginRoute);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("Server is running on port: " + PORT))
  )
  .catch((error) => console.log(error));
