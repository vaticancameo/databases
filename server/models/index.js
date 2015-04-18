var db = require('../db');
var mysql = require('mysql');

module.exports = {
  messages: {
    get: function (cb) {
      db.query("SELECT * FROM Messages", function(err, rows, fields){
        if (err) throw err;
        console.log(rows);
        cb(rows);
      });
    }, 
    post: function (message, cb) {
      var rm = message.roomname,
          text = message.text,
          ca = new Date(),
          user = message.username;
      console.log(JSON.stringify(message));
      console.log(rm + text + ca + user);

      var sql = "INSERT INTO Messages (??) VALUES (??)";
      var columns = ['text',  'roomname', 'username'];
      var values = [text, rm, user];
      var inserts = [columns, values];
      //sql = mysql.format(sql, inserts);
      sql = "INSERT INTO Messages (text, createdAt, roomname, username) "
              + "VALUES ('" + text + "', '" + ca + "' ,'" + rm + "', '" + user + "')";
      console.log(sql);

//      db.query(sql, function(err, results) {
      
      db.query(sql, function(err, results) {
                  if (err) throw err;
                  cb(results);
                }
               );
    } // a function which can be used to insert a message into the database
  },


  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

