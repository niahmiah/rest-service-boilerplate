'use strict';

var config = require('config');
var PORT = config.get('server.port');
var HOSTNAME = config.get('server.hostname');
var server = require('./server');

var log = console;

server.start(function startCb(err){
  if(err) { log.error(err); }
  log.info('Started on ' + PORT);
  log.info('API Documentation available at http://' + HOSTNAME + ':' + PORT + '/docs');
});

// listen for TERM signal .e.g. kill
process.on('SIGTERM', server.stop);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', server.stop);
