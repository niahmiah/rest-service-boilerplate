'use strict';
var config = require('config');
var PORT = config.get('server.port');
var HOSTNAME = config.get('server.hostname');

function SwaggerDoc(doc){
  doc.host = HOSTNAME + ':' + PORT;
  return doc;
}

module.exports = SwaggerDoc;
