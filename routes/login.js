const express = require('express')
    , router = express.Router()
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , config  = require('../config')
    , users   = require('../model/users')
    ;

router.get('/', function (req, res, next) {
    res.render('login', { session: req.session.passport.user, config: config });
});

passport.serializeUser ((userAndRole, done) => done (null, userAndRole));   // [2]

passport.deserializeUser ((user, done) =>                               // [3]
    users.select ({ name: user.name }, function (err, result) {
        if (err) return done (err);
        else {
            var user = result[0];
            if (!user) return done ("No such user"+ username);
            return done (null, { name: user.name, role: user.role });
        }
    })
);

passport.use (new LocalStrategy (config.auth
, function (req, username, password, done) {
      users.select ({ name: username }, function (err, result) {
          if (err) return done (err);
          user = result[0];
          if (!user) {
              return done (null, false, { message: 'Incorrect username' });
          }
          if (user.password != password) {
              return done (null, false, { message: 'Incorrect password' });
          }
          return done (null, user);
      });
  }
));

router.post('/',
    passport.authenticate('local'), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
        res.redirect('/');
});

module.exports = router;
