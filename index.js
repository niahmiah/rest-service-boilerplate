'use strict';

var server = require('./server');

server.start(function startCb(err){
  if(err) {
    process.exit(1);
  }
});

// PM2 sends IPC message for graceful shutdown
process.on('message', function msgCb(msg) {
  if (msg === 'shutdown') {
    server.stop();
  }
});

// Ctrl+c or kill $pid
process.on('SIGINT', server.stop);
process.on('SIGTERM', server.stop);
