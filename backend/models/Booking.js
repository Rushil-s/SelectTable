const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    table: {
      type: Number,
      required: true,
    },
    people: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
