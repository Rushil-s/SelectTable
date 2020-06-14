const router = require('express').Router();
const Restaurant = require('../models/Restaurant');

router.post('', async (req, res) => {
  try {
    const { name, phone, address, location, imageURL, stars, tags } = req.body;

    const newRestaurant = new Restaurant({
      name,
      phone,
      address,
      location,
      imageURL,
      stars,
      tags,
    });

    await newRestaurant.save();
    res.send(newRestaurant);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('', async (req, res) => {
  try {
    const { location } = req.query;
    const restaurants = await Restaurant.find({ location });

    res.send(restaurants);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.delete('', async (req, res) => {
  try {
    const { id } = req.query;
    const restaurants = await Restaurant.deleteOne({ _id: id });

    res.send(restaurants);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
