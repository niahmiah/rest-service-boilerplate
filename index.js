'use strict';

var config = require('config');
var PORT = config.get('server.port');
var HOSTNAME = config.get('server.hostname');
var server = require('./server');

var log = require('./lib/logger');

server.start(function startCb(err){
  if(err) { log.error(err.message, err.stack); }
  log.info('Service started on ' + PORT);
  log.info('API Documentation available at http://' + HOSTNAME + ':' + PORT + '/docs');
});

// PM2 sends IPC message for graceful shutdown
process.on('message', function ipcMsgCb(msg) {
  if (msg === 'shutdown') {
    server.stop(function shutdownCb(){
      log.info('Service stopped.');
    });
  }
});
