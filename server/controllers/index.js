var models = require('../models');
var bluebird = require('bluebird');

var headers = {
  'Content-Type': 'application/json'
}


module.exports = {
  messages: {
    get: function (req, res) {
      // ask models for messages from database
      models.messages.get(function(rows){
        var status = status || 200;
        res.writeHead(status,headers);
        res.end(JSON.stringify(rows));
      });    
    }, // a function which handles a get request for all messages
    
    post: function (req, res) {
      var data = '';
      req.on('data', function(chunk) {
        data += chunk;
      });
      req.on('end', function() {
        data = JSON.parse(data);
        models.messages.post(data, function(){
        res.writeHead(201);
        res.end();
        });
        
      });
      
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

