// YOUR CODE HERE:

var app = {
  server: "https://api.parse.com/1/classes/chatterbox",
  username: "anonymous",
  roomname: "room",
  friends: {},

  init: function(){
    app.username = window.location.search.substr(10);

    app.$main = $(".main");
    app.$chats = $("#chats");
    app.$message = $(".message");
    app.$roomSelect = $("#roomSelect");
    app.$send = $(".send");

   
    app.$send.on("submit", app.handleSubmit)
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




