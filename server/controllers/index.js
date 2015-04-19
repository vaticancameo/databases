var models = require('../models');
var bluebird = require('bluebird');
var _ = require('underscore');
var db = require('../db');

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
      var params = req.query || {};
      params.include = [db.User];
      db.Message.findAll(params).complete(function (err, result) {
        console.log(result);
        if (err) throw err;
        res.set(headers);
        res.status(200);
        if (result[0].dataValues.User) {
          console.log(result[0].dataValues.User.dataValues);
          result[0].dataValues.username = result[0].dataValues.User.dataValues.username;
        }
        res.json({results: result});
      })


      // models.messages.get(function(rows){
      //   var status = status || 200;
      //   res.writeHead(status,headers);
      //   if(req.query.where !== undefined) {
      //     rows = _.filter(rows, function(message) {
      //       return message.roomname === req.query.where.roomname;
      //     });
      //   }
      //   var data = {results: rows};
      //   res.end(JSON.stringify(data));
      // });    
    }, // a function which handles a get request for all messages
    
    post: function (req, res) {
      console.log(req.body);
      db.User.findOrCreate({where: {username: req.body.username}})
      .done(function (err, result) {
        if (err) throw err;
        db.Message.create({
          text: req.body.text,
          roomname: req.body.roomname,
          userid: result[0].dataValues.id
        });
        res.set(headers);
        res.status(201);
        res.json(result);
      });

      // models.messages.post(req.body, function () {
      //   res.writeHead(201,headers);
      //   res.end(JSON.stringify({posted: true}));
      // });
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

