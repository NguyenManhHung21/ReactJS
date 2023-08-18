const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
require("dotenv").config();
const app = express();
const multer = require("multer");
const fs = require("fs");
const db = require("./src/config/db");
const route = require("./src/routes");

//IRVtd7spPJzJSwig
app.use(express.json());

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

//Connect to DB
db.connect();
// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("connect succeefully");
//   } catch (error) {
//     console.log("error: ", error);
//   }
// };
//Routes init
route(app);

app.get("/", async (req, res) => res.send("Api successfully"));

//endpoint
app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) {
      res.status(422).json("You need to fill out img url!");
      return;
    }
    const newName = "/photo" + Date.now() + ".jpg";

    await download.image({
      url: link,
      dest: __dirname + "/uploads" + newName,
    });

    res.json(newName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const photosMiddleware = multer({ dest: "uploads/" });
//endpoint
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadFiles = [];
  for (let file of req.files) {
    const { path, originalname } = file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadFiles);
});


// app.get(
//   "/middleware",
//   (req, res, next) => {
//     if (["vevip", "vethuong"].includes(req.query.ve)) {
//       req.weapon = "sword";
//       return next();
//     }
//     res.status(403).json({
//       message: "Go home and bring your tiket now!",
//     });
//   },
//   (req, res, next) => {
//     res.send(
//       `<h2 style="color: red;">Anh Hung dep trai dang cam ${req.weapon} </h2>`
//     );
//   }
// );

app.listen(4000, () => console.log('Server is runing on port 4000'));
