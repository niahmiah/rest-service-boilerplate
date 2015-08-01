'use strict';

var config = require('config');
var PORT = config.get('server.port');
var DB = config.get('db');

var swaggerDoc = require('./swagger.json');
var apiDoc = require('./lib/swaggerDoc')(swaggerDoc);

var server;
var mongoose = require('mongoose');

var express = require('express');
var swaggerTools = require('swagger-tools');

var errorHandler = require('./lib/middleware/errorHandler');

function start(cb) {
  mongoose.connect(DB);
  var db = mongoose.connection;
  db.on('error', cb);
  db.once('open', function openCb() {
    swaggerTools.initializeMiddleware(apiDoc, function initSwaggerCb(middleware) {
      var app = express();
      app.use(middleware.swaggerMetadata()); // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      app.use(middleware.swaggerValidator());
      app.use(middleware.swaggerRouter({controllers: './api/controllers'}));
      app.use(middleware.swaggerUi()); // Swagger documents and Swagger UI
      app.use(errorHandler);
      server = app.listen(PORT, cb);
    });
  });
}

function stop(cb){
  try{
    server.close(function serverStopCb() {
      mongoose.disconnect(function mongooseStopCb(){
        if(cb) { cb(); }
      });
    });
  }catch(e){
    if(cb) { return cb(e); }
    process.exit(1);
  }
}

module.exports = {
  start: start,
  stop: stop
};
