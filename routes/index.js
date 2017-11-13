const express = require('express')
    , router = express.Router()
    ;

router.get ('/', function (req, res, next) {
    res.render('index', { session: req.session.passport.user });
});

module.exports = router;
