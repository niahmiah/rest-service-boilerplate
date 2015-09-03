'use strict';

var winston = require('winston');
var config = require('config');
var level = config.get('log.level');
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({'timestamp': true, level: level})
  ]
});

module.exports = logger;
