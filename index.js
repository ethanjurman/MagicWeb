var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

var playerId = 0;
io.on('connection', function(socket){
  var id = playerId++;
  players.push(new Player(id, [0,1,2,3,4,5,6,7,8,9,10]));
  console.log("player "+id+" joined");
  io.emit('chat message', "player "+id+" joined");
  socket.on('disconnect', function(){
    console.log("player "+id+" left");
    io.emit('chat message', "player "+id+" left");
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('draw', function(size){
    players[id].draw(size);
  });
  socket.on('loadDeck', function(deck){
    players[id].loadDeck(deck);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// Player Client Stuff
var players = [];

function Player (id) {
  this.id = id; // PLAYER ID
  this.deck = []; // DECK (array of id's)
  this.hand = []; // HAND (array of id's)
  this.graveyard = []; // GRAVEYARD (array of id's)
  this.exile = []; // EXILE (array of id's)
}

Player.prototype.draw = function(drawSize){
  var drawSize = drawSize || 1;
  while(drawSize-- > 0){
    var cardId = this.deck.pop();
    this.hand.push(cardId);
    // addCardToHand(cardId);
  }
  console.log(this.hand);
}

Player.prototype.loadDeck = function(deck){
  
}

Player.prototype.shuffle = function(){
  this.deck = shuffleArray(this.deck);
}
