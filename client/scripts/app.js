// YOUR CODE HERE:
$(document).ready(function() {

window.app = {};

window.app.server = 'http://127.0.0.1:3000/classes/messages';
window.app.friendsList = [];
window.app.context = {
  currentRoom: "",
  currentFriend: "",
  roomList: {
    undefined: undefined
  }
};

window.app.init = function () {
  $('#roomSelect').children(":first").data("name", '');

  $.ajax({

    url: window.app.server,
    type: 'GET',
    // data: {
    //   order: '-createdAt'
    // },
    contentType: 'application/json',

    success: function(data) {
      var messages = data.results;
      if(messages.length === 0 ) {
        window.app.lastDate = 0;
      } else {
        window.app.lastDate = new Date(messages[messages.length -1 ].createdAt).getTime();
      }
      for (var i = 0; i < messages.length; i++) {
        window.app.addMessage(messages[i]);
      };

    }

  });
}

window.app.fetch = function(roomName, friend) {
  var data = {};
  if (roomName || friend) {
    data.where = {};
  }
  if (roomName) {
    data.where.roomname = roomName;
    window.app.context.currentRoom = roomName;
  }
  if (friend) {
    data.where.username = friend;
  }

  $.ajax({
  url: window.app.server,
  type: 'GET',
  data: data,
  contentType: 'application/json',

  success: function(data) {
    var messages = data.results;

    if (roomName || friend) {
      window.app.clearMessages();
    }

    for (var i = 0; i < messages.length; i++) {
      var messageDate = new Date(messages[i].createdAt).getTime();
      if (messageDate > window.app.lastDate) {
        window.app.addMessage(messages[i]);
      }
    }
    if(messages.length !== 0) {
      window.app.lastDate = new Date(messages[messages.length - 1].createdAt).getTime();
    } else {
      window.app.lastDate = 0;
    }
  }
});
};

window.app.addMessage = function(messageData) {
  var message = $('<div></div>').addClass('chat').hide();
  var formattedDate = new Date(messageData.createdAt).toDateString();
  message.append($('<div class="messageHeader"><span class="username"></span><span class="createdAt"></span></div><div class="messageBody"></div>'));
  message.find('.username').text(messageData.username);
  message.find('.createdAt').text(formattedDate);
  message.find('.messageBody').text(messageData.text);
  if (window.app.friendsList.indexOf(messageData.username) > -1) {
    message.find('.username').addClass('friend');
    message.find('.messageBody').addClass('friend');
  }
  $('#chats').prepend(message);
  $('#chats').find(':hidden').fadeIn(800);
  $('#chats').find(">:first-child").on('click', function () { window.app.addFriend(messageData.username); });
  if (!(messageData.roomname in window.app.context.roomList) && messageData.roomname) {
    window.app.addRoom(messageData.roomname);
  }
};

window.app.clearMessages = function(){
  $('#chats').empty();
  window.app.lastDate = 0;
};

window.app.addRoom = function (roomName) {
  // escape roomname in value attribute later
  $('#roomSelect').append($('<option></option>').text(roomName).data("name", roomName));
  window.app.context.roomList[roomName] = roomName;
};

window.app.addFriend = function (username) {
  window.app.friendsList.push(username);
  window.app.clearMessages();
  window.app.fetch(window.app.context.currentRoom);
};

window.app.send = function(message) {
  $.ajax({
    url: window.app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function() {
      window.app.fetch(message.roomname);
    }, 
    error: function(e, type) {
      console.log('send error ' + JSON.stringify(e));
    }
  });
};

window.app.handleSubmit = function() {
  var username = window.location.search.split('=')[1];
  var text = $('.userMessage').val();
  window.app.send({
      username: username,
      text: text,
      roomname: window.app.context.currentRoom
    });
  $('.userMessage').val('');
};

window.app.init();

//setInterval(window.app.fetch, 5000);

$('#send').submit(function (event) {
  event.preventDefault();
  window.app.handleSubmit();
});

$('#roomSelect').on('change', function () {
  if ($(this).find(':selected').text() === 'Create a new room...') {
    window.app.context.currentRoom = prompt("Enter new room name:");
    window.app.addRoom(window.app.context.currentRoom);
    $(this).val(window.app.context.currentRoom);
  } else {
    window.app.context.currentRoom = $(this).find(':selected').data("name");
  }
  window.app.clearMessages();
  window.app.fetch(window.app.context.currentRoom);
});

});