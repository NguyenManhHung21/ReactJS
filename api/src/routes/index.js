const placesRouter = require("./places");
const bookingsRouter = require("./bookings");
const loginRouter = require("./login");
const registrationRouter = require("./registration");
const sitesRouter = require("./sites");
const delPlaceRouter = require("./delPlace");
function route(app) {
  app.use("/places", placesRouter);
  app.use("/bookings", bookingsRouter);
  app.use("/login", loginRouter);
  app.use("/register", registrationRouter);
  app.use("/", sitesRouter);
  app.use("/", delPlaceRouter);
}

module.exports = route;
