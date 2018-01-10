const express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
//    , cookieParser = require('cookie-parser');
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , localStrategy = require('passport-local').Strategy
    , session = require('express-session')
    , MySQLStore = require('express-mysql-session')(session)

    , config = require('./config')

    , index = require('./routes/index')
    , users = require('./routes/users')
    , login = require('./routes/login')
    ;

var app = express();

//var sessionStore = new MySQLStore (config.db);
config.session.store = new MySQLStore (config.db);
app.use (session (config.session));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use (logger('dev'));
app.use (bodyParser.json());
app.use (bodyParser.urlencoded ({ extended: false }));
//app.use (cookieParser());
app.use (express.static (path.join (__dirname, 'public')));
 
// Passport:
app.use (passport.initialize());
app.use (passport.session());

app.use (function (req, res, next) {
    const login = '/login';
    if ((! req.session.passport || ! req.session.passport.user) && req.path != login)
        res.redirect (login);
    else next();
});

app.use ('/', index);
app.use ('/users', users);
app.use ('/login', login);
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});
// catch 404 and forward to error handler
app.use (function (req, res, next) {
  var err = new Error ('Not Found');
  err.status = 404;
  next (err);
});

// error handler
app.use (function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status (err.status || 500);
  res.render ('error');
});

module.exports = app;
