const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const jwtSecret = "usadWdu32iUIAs4ad2";
const multer = require("multer");
const fs = require("fs");

//IRVtd7spPJzJSwig
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
mongoose.connect(process.env.MONGO_URL);

//lấy ra 1 user
const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  });
};

app.get("/testday", (req, res) => {
  res.json("test ok nha");
});

//endpoint
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

//endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    // so sánh password ở req.body xem có trùng vs password ở trong userDoc(là password mà ta đã hash trước đó ở register lưu vào csdl)
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (passOK) {
      //chữ ký cá nhân
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          //đăng nhập thành công thì set cookie lưu lại dữ liệu trên cookie
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not OK");
    }
  } else {
    res.json("email not Ok");
  }
});

//mỗi lần reload lại browser app sẽ dùng GET gửi đến cookie 1 yêu cầu để lấy về mã token mà mình đã đăng ký ở phần đăng nhập
app.get("/profile", (req, res) => {
  const { token } = req.cookies; //gửi yêu cầu tới cookie để lấy ra mã token
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});
//endpoint
app.post("/logout", (req, res) => {
  //reset cookies
  res.cookie("token", "").json(true); // lúc này sign sẽ để trống
});

//endpoint
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "/photo" + Date.now() + ".jpg";
  const options = {
    url: link,
    dest: __dirname + "/uploads" + newName, // will be saved to /path/to/dest/image.jpg
  };

  await download.image(options);
  res.json(newName);
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

//endpoint
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    const place = await Place.find({ owner: id });
    res.json(place);
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("OK");
    }
  });
});

//show page main
app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

//Book this place
app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  console.log(req.body);
  Booking.create({
    place,
    user: userData.id,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen(4000);
