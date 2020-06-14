const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
