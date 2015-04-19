var mysql = require('mysql');
var Sequelize = require('sequelize');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
// var dbConnection = mysql.createConnection({
//     user: "root",
//     password: "",
//     database: "chat"
// });

// dbConnection.connect();

// module.exports = dbConnection;

var sequelize = new Sequelize("chat", "root", "");

var User = sequelize.define('User', {
  username: Sequelize.STRING 
});

var Message = sequelize.define('Message', {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

User.sync();
Message.sync();

User.hasMany(Message);
Message.belongsTo(User);

exports.User = User;
exports.Message = Message;
