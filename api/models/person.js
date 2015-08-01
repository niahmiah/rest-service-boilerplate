'use strict';

var mongoose = require('mongoose');
var getSchema = require('../../lib/schema');

var modelName = 'Person';
var Schema = getSchema(modelName);

// create methods on the schema before converting to model
// Schema.methods.doSomething = function()...

module.exports = Schema = mongoose.model(modelName, Schema);
