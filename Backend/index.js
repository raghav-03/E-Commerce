const Express = require("express");
const app = Express();
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: "config/config.env" });
app.use(Express.json());
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileupload());
app.use(cors());
app.use(require("./router/index.js"));
const mongoose = require("mongoose");
const { urlencoded } = require("express");
require("./db/config");

app.use(Express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.listen(process.env.PORT || 3601, (e) => {
  if (e) {
    console.log("Error");
    return;
  }
  console.log(`Server Running fine on port ${process.env.PORT || 3601}`);
});
