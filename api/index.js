const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./src/app/models/User.js");
const Place = require("./src/app/models/Place.js");
const Booking = require("./src/app/models/Booking.js");
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

const route = require('./src/routes')

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
// const getUserDataFromReq = (req) => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(userData);
//       }
//     });
//   });
// };

//Routes init
route(app);

app.get("/testday", (req, res) => {
  res.json("test ok nha");
});

//endpoint
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json("registration successful");
  } catch (err) {
    res.status(422).json(`Error: ${err.message}`);
  }
});

app.get("/check-email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ isEmailExist: true });
    } else {
      res.json({ isEmailExist: false });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; 

    const userDoc = await User.findOne({ email });

    if (!userDoc) return res.status(422).json("email not OK");

    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (!passOK) return res.status(422).json("pass not OK");

    const tokenOptions = {};
    const token = jwt.sign(
      {
        email: userDoc.email,
        id: userDoc._id,
      },
      jwtSecret,
      tokenOptions
    );

    res.cookie("token", token).json(userDoc);
  } catch (err) {
    res.status(500).json(err.message);
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
  try {
    const { link } = req.body;
    if (!link) {
      res.status(422).json("You need to fill out img url!");
      return;
    }
    const newName = "/photo" + Date.now() + ".jpg";

    await download.image({ url: link, dest: __dirname + "/uploads" + newName });

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



app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    const place = await Place.find({ owner: id });
    res.json(place);
  });
});


//endpoint
// app.post("/places", (req, res) => {
//   try {
//     const { token } = req.cookies;
//     if (!token) res.status(422).json("There are not data from UI!");
//     const {
//       name,
//       title,
//       address,
//       addedPhotos,
//       description,
//       perks,
//       extraInfo,
//       checkIn,
//       checkOut,
//       maxGuests,
//       price,
//     } = req.body;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//       if (err) throw err;
//       const placeDoc = await Place.create({
//         owner: userData.id,
//         name,
//         title,
//         address,
//         photos: addedPhotos,
//         description,
//         perks,
//         extraInfo,
//         checkIn,
//         checkOut,
//         maxGuests,
//         price,
//       });
//       res.json(placeDoc);
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(`Error: ${error}`);
//   }
// });

// app.put("/places", async (req, res) => {
//   try {
//     const { token } = req.cookies;
//     if (!token) res.status(422).json("There are not data from UI!");
//     const {
//       id,
//       name,
//       title,
//       address,
//       addedPhotos,
//       description,
//       perks,
//       extraInfo,
//       checkIn,
//       checkOut,
//       maxGuests,
//       price,
//     } = req.body;
//     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//       if (err) throw err;
//       const placeDoc = await Place.findById(id);
//       if (userData.id === placeDoc.owner.toString()) {
//         placeDoc.set({
//           name,
//           title,
//           address,
//           photos: addedPhotos,
//           description,
//           perks,
//           extraInfo,
//           checkIn,
//           checkOut,
//           maxGuests,
//           price,
//         });
//         await placeDoc.save();
//         res.json("OK");
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(`Error: ${error}`);
//   }
// });

//show page main
// app.get("/places", async (req, res) => {
//   res.json(await Place.find());
// });

//Book this place
// app.post("/bookings", async (req, res) => {
//   try {
//     const userData = await getUserDataFromReq(req);
//     const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
//       req.body;
//     if (!checkIn || !checkOut || !numberOfGuests || !name || !phone)
//       return res.status(422).json("Some fields do not enter!");
//     Booking.create({
//       place,
//       user: userData.id,
//       checkIn,
//       checkOut,
//       numberOfGuests,
//       name,
//       phone,
//       price,
//     }).then((doc) => {
//       res.json(doc);
//     });
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// });

// app.get("/bookings", async (req, res) => {
//   try {
//     const userData = await getUserDataFromReq(req);
//     res.json(await Booking.find({ user: userData.id }).populate("place"));
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });

app.delete("/del-place/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(422).json("id is not exist");
      return;
    }
    await Booking.deleteOne({ _id: id });
    res.status(200).json("delete was successful");
  } catch (err) {
    res.status(500).json("error: " + err.message);
  }
});
app.listen(4000);
