const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// USER REGISTER
// expiresIN Format:  { expiresIn: 60 * 60 * 24 } in other words, 1 day
router.post('/register', function (req, res) {
  User.create({
    username: req.body.user.username,
    passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13),
  })
    .then(function registerSuccess(user) {
      let token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
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
  //  console.log(req.body);
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        //        console.log('USER: ' + user.id);
        bcrypt.compare(req.body.user.passwordhash, user.passwordhash, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.status(200).json({
              user: user,
              message: 'User successfully logged in!',
              sessionToken: token,
            });
          } else {
            // remove error: err below, but leave err dimmed out above to avoid giving too much info to malicious users
            res.status(502).json({ message: 'Login Failed', error: err });
          }
        });
      } else {
        res.status(500).json({ error: 'User does not exist.' });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
