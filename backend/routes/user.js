const router = require('express').Router();
const { hashSync } = require('bcryptjs');
const User = require('../models/User');

const { userToSessionUser } = require('../helpers/userToSessionUser');

router.post('', async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;
    const hashPassword = hashSync(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashPassword,
    });

    await newUser.save();
    const sessionUser = userToSessionUser(newUser);
    req.session.user = sessionUser;
    res.send(sessionUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
