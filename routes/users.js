const express = require('express')
    , router  = express.Router()
    , config  = require('../config')
    , users   = require('../model/users')
    ;

/* GET users listing. */
router.get('/', function (req, res, next) {
    users.selectAll (function (err, rows) {
        if (err) next (err);
        else res.render ('users', { rows : rows, session: req.session.passport.user });
    });
});

router.post('/', function (req, res, next) {
    var id = req.body.id
      , name = req.body.name
      , password = req.body.password
      , role = req.body.role
      ;
    // TODO more correct fieald processing
    if (id && name && password && role) { // update
        users.update (id, name, password, role, function (err, result) {
            if (err) next (err);
            else res.redirect ('users'); 
        });
    } else if (name && password && role) { // append
        users.insert (name, password, role, function (err, rows) {
            if (err) next (err);
            else res.redirect ('users'); 
        });
    } else if (id) { // delete
        users.delete (id, function (err, rows) {
            if (err) next (err);
            else res.redirect ('users'); 
        });
    }
});

router.get('/:id', function (req, res, next) {
    var title, user;
    if (req.params.id == 'add') {
        user = { name:'', password:'', role:'OPERATOR'}
    } else {
        user = users.find (req.params.id);
    }
    if (user)
        res.render ('user', { user: user, config: config, session: req.session.passport.user });
    else
        res.render ('nouser', { session: req.session.passport.user });
});

module.exports = router;
