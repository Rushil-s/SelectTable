const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectStore = require('connect-mongo');

const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurant');
const bookingRoutes = require('./routes/booking');
const sessionRoutes = require('./routes/session');

const PORT = 5000;
const MONGO_URI = 'mongodb://localhost/SelecTableDB';
SESS_NAME = 'sid';
SESS_SECRET = 'session_secret_change';
SESS_LIFETIME = 1000 * 60 * 60 * 2;

// SHOULD STORE CONSTANTS INSIDE .ENV FILE

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('db connected');

    const app = express();
    const MongoStore = connectStore(session);

    app.disable('x-powered-by');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(
      session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          collection: 'session',
          ttl: Number(SESS_LIFETIME) / 1000,
        }),
        cookie: {
          sameSite: true,
          secure: process.env.MODE === 'production',
          maxAge: Number(SESS_LIFETIME),
        },
      })
    );

    app.use('/api/user', userRoutes);
    app.use('/api/restaurant', restaurantRoutes);
    app.use('/api/booking', bookingRoutes);
    app.use('/api/session', sessionRoutes);

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
})();
