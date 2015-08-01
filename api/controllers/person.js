'use strict';
var JSONStream = require('JSONStream');
var Model = require('../models/person');

function GET(req, res, next){
  if(!req.swagger.params.id){
    res.set('Content-Type', 'application/json');
    Model.find(req.swagger.params).stream().pipe(JSONStream.stringify()).pipe(res);
  }else{
    Model.findOne(req.params, function findOneCb(err, doc){
      if(err){
        res.status(500).send();
      }else if(doc){
        res.status(200).json(doc);
      }else{
        res.status(404).send();
      }
    });
  }
}

function POST(req, res, next){
  var M = Model;
  var doc = new M(req.body);
  doc.save(function saveCb(err){
    if(err){
      res.status(500).send();
    }else{
      res.status(201).json(doc);
    }
  });
}

function PUT(req, res, next){
  Model.update(req.swagger.params, req.body, function updateCb(err){
    if(err){
      res.status(500).send();
    }else{
      res.status(200).json(req.body);
    }
  });
}

function DEL(req, res, next){
  Model.remove(req.params, function removeCb(err){
    if(err){
      res.status(500).send();
    }else{
      res.status(200).json();
    }
  });
}

module.exports = {
  GET: GET,
  POST: POST,
  PUT: PUT,
  DEL: DEL
};
