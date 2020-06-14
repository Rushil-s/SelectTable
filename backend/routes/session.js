const router = require('express').Router();
const User = require('../models/User');
const { userToSessionUser } = require('../helpers/userToSessionUser');

router.post('', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user && user.comparePasswords(password)) {
      const sessionUser = userToSessionUser(user);
      req.session.user = sessionUser;
      res.send(sessionUser);
    } else {
      throw new Error('Invalid login credentials');
    }
  } catch (err) {
    res.status(401).send(err);
  }
});

router.delete('', (req, res) => {
  const { session } = req;
  try {
    const user = session.user;
    if (user) {
      session.destroy((err) => {
        if (err) throw err;
        res.clearCookie(SESS_NAME);
        res.send(user);
      });
    }
  } catch (e) {
    req.status(422).send(e);
  }
});

router.get('', (req, res) => {
  const { session } = req;
  const { user } = session;
  res.send({ user: user || null });
});

module.exports = router;
