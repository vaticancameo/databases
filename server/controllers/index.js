var models = require('../models');
var bluebird = require('bluebird');
var _ = require('underscore');

var headers = {
  'Content-Type': 'application/json',
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


module.exports = {

  messages: {
    get: function (req, res) {
     
      // ask models for messages from database
      models.messages.get(function(rows){
        var status = status || 200;
        res.writeHead(status,headers);
        if(req.query.where !== undefined) {
          rows = _.filter(rows, function(message) {
            return message.roomname === req.query.where.roomname;
          });
        }
        var data = {results: rows};
        res.end(JSON.stringify(data));
      });    
    }, // a function which handles a get request for all messages
    
    post: function (req, res) {
      models.messages.post(req.body, function () {
        res.writeHead(201,headers);
        res.end(JSON.stringify({posted: true}));
      });
    },

    options: function(req, res) {
      res.writeHead(200, headers);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(rows) {
        var status = 200;
        res.writeHead(status, headers);
        var data = {results: rows};
        res.end(JSON.stringify(data));
      });
    },

    post: function (req, res) {
      console.log(req.body);
      models.users.post(req.body, function () {
        res.writeHead(201,headers);
        res.end(JSON.stringify({posted: true}));
      }); 
    },

    options: function(req, res) {
      res.writeHead(200, headers);
      res.end();
    }
  }
};

