'use strict';
var config = require('config');
var showErrors = config.get('errors.showStack');

module.exports = function errorHandler(err, req, res, next){
  if (err.status) res.statusCode = err.status;
  if (res.statusCode < 400) res.statusCode = 500;
  req.headers = req.headers || {};
  var accept = req.headers.accept || '';
  // json
  if (~accept.indexOf('json')) {
    var error = { message: err.message};
    if(showErrors) error.stack = err.stack;
    for (var prop in err) error[prop] = err[prop];
    var json = JSON.stringify({ error: error });
    res.setHeader('Content-Type', 'application/json');
    res.end(json);
  // plain text
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.end(err.message);
  }
};
