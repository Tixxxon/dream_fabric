var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('config');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');
// var products = require('./routes/products');

// Create app and configure this
var app = express();
//app.set('port', config.get('port'));

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Setup logger
if (app.get('env') == 'development') {
    app.use(logger('dev')); // immidiate - ключ для отправки в лог до начала запроса
} else {
    app.use(logger('default'));
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/products', products);


// Middlewares
// app.use(function (req, res, next) {
//     if (req.url == '/') {
//         res.end("Hello, Express!");
//     } else {
//         next();
//     }
// });


// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
