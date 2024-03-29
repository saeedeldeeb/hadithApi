var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//------------
const readingBooks = require('./routes/readingBooks')
const langs = require('./routes/langs')
const readingChapters = require('./routes/readingChapters')
const readingAhadith = require('./routes/readingAhadith')
var app = express();

require('./prod')(app);
//static Api page
app.use(express.static(path.join(__dirname,"static")));
app.get('/',(req,res)=>{
  res.status(200).sendFile(path.join(__dirname,"static","index.html"));
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//----------------
app.use('/api',[readingBooks,langs,readingChapters,readingAhadith]);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  
  res.send({"code":err.status,"status":err.message,"data":"Invalid endpoint or resource."})
});

module.exports = app;
