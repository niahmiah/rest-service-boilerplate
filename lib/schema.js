'use strict';
var Swagger2Mongoose = require('swagger2mongoose');
var swaggerDoc = require('../swagger.json');

var s2m = new Swagger2Mongoose({
  swaggerDoc: swaggerDoc,
  modelDir: 'api/models'
});

function GetSchema(name){
  return s2m.getMongooseSchema(name);
}

// create methods on the schema before converting to model
// Schema.methods.doSomething = function()...

module.exports = GetSchema;
