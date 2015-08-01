'use strict';
require('chai').should();
var mongoose = require('mongoose');
var rest = require('restler');
var server = require('../../../server');
var config = require('config');
var host = config.get('server.hostname');
var port = config.get('server.port');
var baseUrl = 'http://' + host + ':' + port;

describe('Person Controller', function descCb(){
  before(server.start);

  after(function cb(done) {
    var Model = mongoose.model('Person');
    Model.remove(function rmCb(){
      server.stop(done);
    });
  });

  var person;

  it('should allow creation of a person', function itCb(done){
    rest.postJson(baseUrl + '/person',
      {name: 'John Doe'}
    ).on('complete', function completeCb(data, response){
      (response.statusCode).should.equal(201);
      person = data;
      done();
    });
  });

  it('should allow retrieval of a person', function itCb(done){
    rest.get(baseUrl + '/person/' + person._id)
    .on('complete', function completeCb(data, response){
      (response.statusCode).should.equal(200);
      done();
    });
  });
});
