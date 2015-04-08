// YOUR CODE HERE:

var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  username: "anonymous",
  roomname: "room",
  lastMessageId: 0,
  friends: {},

  init: function(){
    app.username = window.location.search.substr(10);

    app.$main = $(".main");
    app.$chats = $("#chats");
    app.$message = $(".message");
    app.$roomSelect = $("#roomSelect");
    app.$send = $(".send");

    app.$main.on("click", '.username', app.addFriend)
    app.$send.on("submit", app.handleSubmit)
    app.$roomSelect.on('change', app.saveRoom)


    setTimeout(app.fetch, 1000);
  }
};

app.send = function(message){
	$.ajax({
		type: "POST",
		url: app.server,
		data: JSON.stringify(message),
		contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      console.log(data)
      app.fetch();
    },
    error: function(data){
      console.error('chatterbox: Failed to send message');
    }
	})
}

app.fetch = function(){
  $.ajax({
    type: "GET",
    url: app.server,
    contentType: 'application/json',
    data: {
      limit: 200,
      order: "-createdAt"
    },
    success: function (data) {
      console.log('retrieved');
      console.log(data);

      if(!data.results || !data.results.length){ return;}

      var recentMessages = data.results[data.results.length-1];

      var displayedRoom = $('.chat span').first().data('roomname')

      if (mostRecentMessage.objectId !== app.lastMessageId ||
        app.roomname !== displayedRoom){
        app.populateRooms(data.results);

      app.populateMessages(data.results);

      app.lastMessageId = mostRecentMessage.objectId;
      }
      _.each(data.results, function(obj){
          app.addMessage(obj);
      })
    }
  })
};

app.clearMessages = function(){
  app.$chats.html('');
}

app.addMessage = function(message){
  $("#chats").append('<div class="chat">' +
    '<span class="username">'+ message.username +": "+ '</span>' +
    '<span class="text">'+ message.text +'</span>' + "<br>" +
    '<span class="roomName">'+ message.roomname + '</span>'+
    '</div>');
}

app.addRoom = function(roomName){
  $("#roomSelect").append('<span class="room">'+ roomName + '</span>');
}

app.addFriend = function(evt){
  var username = $(evt.currentTarget).attr('data-username');
  console.log(username);
}

app.handleSubmit = function(msg){

  var message = {
    "username": app.username
    "text": app.$message.val(),
    "roomname": app.roomname || "room"
  }

  app.send(message);
}

$("form#addRoom").click(function(event){
  var roomName = $('input.room').val();
  app.addRoom(roomName);
  event.preventDefault();
})




