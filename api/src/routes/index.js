const placesRouter = require('./places')
const bookingsRouter = require('./bookings')
function route(app) {
    app.use('/places', placesRouter);
    app.use('/bookings', bookingsRouter);
}

module.exports = route;
