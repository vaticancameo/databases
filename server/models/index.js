var db = require('../db');
var mysql = require('mysql');

module.exports = {
  messages: {
    get: function (cb) {
      db.query("SELECT * FROM Messages", function (err, rows){
        if (err) throw err;
        cb(rows);
      });
    }, 
    post: function (message, cb) {
      var rm = message.roomname,
          text = message.text,
          ca = new Date(),
          user = message.username;

      var data = {text: text, createdAt: ca, roomname: rm, username: user};
      var sql = mysql.format('INSERT INTO Messages SET ?', data);


      db.query(sql, function (err, results) {
          if (err) throw err;
          cb(results);
        }
       );
    }
  },


  users: {
    // Ditto as above.
    get: function (cb) {
      db.query("SELECT * FROM Users", function (err, rows) {
        if (err) throw err;
        cb(rows);
      });
    },
    post: function (user, cb) {
      var data = {username: user.username};
      var sql = mysql.format('INSERT INTO Users SET ?', data);


      db.query(sql, function (err, results) {
        if (err) throw err;
        cb(results);
      });
    }
  }
};

