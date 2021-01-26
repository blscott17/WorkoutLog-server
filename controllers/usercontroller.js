const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');

// USER SIGNUP
router.post('/create', function (req, res) {
  User.create({
    username: req.body.user.username,
    passwordhash: req.body.user.passwordhash,
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        {
          id: user.id,
        },
        'i_am_secret',
        { expiresIn: 60 * 60 * 60 }
      );
      res.json({
        user: user,
        message: 'User successfully created!',
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// Login
router.post('/login', function (req, res) {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        res.status(200).json({
          user: user,
        });
      } else {
        res.status(500).json({ error: 'User does not exist.' });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
