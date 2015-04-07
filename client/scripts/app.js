// YOUR CODE HERE:

var app = {
	url: "https://api.parse.com/1/classes/chatterbox",
  server: "https://api.parse.com/1/classes/chatterbox"
};

app.init = function(){
  app.fetch();

}

app.send = function(message){
	$.ajax({
		type: "POST",
		url: app.url,
		data: JSON.stringify(message),
		contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    }
	})
}

app.fetch = function(){
  $.ajax({
    type: "GET",
    url: app.url,
    contentType: 'application/json',
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
  $("#chats").text("");
}

app.addMessage = function(message){
  
  $("#chats").append('<div class="chat">' +
    '<span class="username">'+ message.username + '</span>' +
    '<span class="text">'+ message.text +'</span>' +
    '<span class="roomName">'+ message.roomname + '</span>'+
    '</div>');

}

app.addRoom = function(roomName){
  $("#roomSelect").append('<span class="room">'+ roomName + '</span>');
}

app.addFriend = function(){

}

app.handleSubmit = function(){

}

/*
$(".username").on("click", function(){

});


$("#refresh").on("click", function(event){
  app.clearMessages();
  app.fetch();

  event.preventDefault();
})
*/


