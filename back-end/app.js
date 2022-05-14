var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 全局导入连接数据库的方法
var gdb = require('./libs/config');
var db;
(async () => {
  db = await gdb()
})();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 跨域设置
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-headers', 'Content-type, Content-length, Authorization, Accept, X-request-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('X-powered-by', '3.2.1');
  if(req.method === 'OPTIONS') res.send(200)
  else next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', require('./routes/login'));
app.use('/attendance', require('./routes/attendance'));
app.use('/list', require('./routes/list'));
app.use('/information', require('./routes/information'));
app.use('/data', require('./routes/dataView'));
app.use('/menu', require('./routes/menu'));

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
  res.render('error');
});

module.exports = app;
