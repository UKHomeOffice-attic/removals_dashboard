var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var firebase = require('firebase');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//var myFirebaseRef = new firebase("https://amber-torch-1333.firebaseio.com/");

//myFirebaseRef.set({
//  centres: [{
//    name: 'Heathrow',
//    centre_id: 1,
//    full_capacity: 300,
//    male_capacity: 180,
//    female_capacity: 120,
//    current_male_beds: 40,
//    current_female_beds: 35
//  },{
//    name: 'Colnbrook',
//    centre_id: 2,
//    full_capacity: 200,
//    male_capacity: 80,
//    female_capacity: 120,
//    current_male_beds: 50,
//    current_female_beds: 15
//  },{
//    name: 'Harmandsworth',
//    centre_id: 3,
//    full_capacity: 250,
//    male_capacity: 180,
//    female_capacity: 70,
//    current_male_beds: 20,
//    current_female_beds: 100
//  }]
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
