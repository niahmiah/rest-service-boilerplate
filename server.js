'use strict';

var config = require('config');
var HOST = config.get('server.hostname');
var PORT = config.get('server.port');
var DB = config.get('db');

var swaggerDoc = require('./swagger.json');
var apiDoc = require('./lib/swaggerDoc')(swaggerDoc);

var server;
var mongoose = require('mongoose');

var express = require('express');
var swaggerTools = require('swagger-tools');

var errorHandler = require('./lib/middleware/errorHandler');

var log = require('./lib/logger');

function start(cb) {
  var configs = config.util.getConfigSources();
  configs.forEach(function iterator(c){
    log.info('Loading config ' + c.name);
  });
  mongoose.connect(DB);
  var db = mongoose.connection;
  db.on('error', function dbConnErrCb(err){
    log.error('Database connection error: ' + err);
    cb(err);
  });
  db.once('open', function openCb() {
    log.debug('Connected to database: ' + DB);
    swaggerTools.initializeMiddleware(apiDoc, function initSwaggerCb(middleware) {
      log.debug('Initialized middleware. Starting app.');
      var app = express();
      app.use(middleware.swaggerMetadata()); // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      log.debug('Loaded middleware: swaggerMetadata');
      app.use(middleware.swaggerValidator());
      log.debug('Loaded middleware: swaggerValidator');
      app.use(middleware.swaggerRouter({controllers: './api/controllers'}));
      log.debug('Loaded middleware: swaggerRouter');
      app.use(middleware.swaggerUi()); // Swagger documents and Swagger UI
      log.debug('Loaded middleware: swaggerUI');
      app.use(errorHandler);
      log.debug('Loaded middleware: errorHandler');
      log.info('Service started on ' + PORT);
      log.info('API Documentation available at http://' + HOST + ':' + PORT + '/docs');
      server = app.listen(PORT, cb);
    });
  });
}

function stop(cb){
  log.info('Initiating graceful shutdown');
  try{
    server.close(function serverStopCb() {
      mongoose.disconnect(function mongooseStopCb(){
        log.info('Shutdown complete');
        if(cb) { cb(); }
      });
    });
  }catch(e){
    log.info('Shutdown complete');
    if(cb) { return cb(e); }
    process.exit(1);
  }
}

module.exports = {
  start: start,
  stop: stop
};
