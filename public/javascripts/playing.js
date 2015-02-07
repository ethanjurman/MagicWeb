// IMAGE STUFF
function addCardToHand(cardId){
  document.getElementById("hand").appendChild(makeCardImage(cardId,["hand-card"]));
}

function makeCardImage(id,classes){
  // classes must be a list
  if (classes != "" + classes){
    classes = [classes];
  }
  // make image and return it
  var img = document.createElement("img");
  img.setAttribute("class",classes.join(" "));
  img.setAttribute("draggable", "true");
  img.setAttribute("onmouseover","cardEnhance(" + id + ")");
  img.setAttribute("src","https://api.mtgdb.info/content/card_images/"+id+".jpeg");
  return img;
}

function cardEnhance(id){
  var ec = document.getElementById("enhance-card")
  var img = document.createElement("img");
  img.setAttribute("src","http://api.mtgdb.info/content/hi_res_card_images/"+id+".jpg");
  ec.innerHTML = "";
  ec.appendChild(img);
}

//Randomize array element order in-place.
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function chat(message){
  var socket = io();
  socket.emit('chat message', message);
  document.getElementById("chat-input").value = "";
}

function draw(){
  console.log("GONNA DRAW");
  var socket = io();
  socket.emit('draw',1);
}

window.onload = function(){
  var socket = io();
  socket.on('chat message', function(msg){
    var m = document.createElement("span");
    var messages = document.getElementById("messages");
    m.setAttribute("class","message");
    m.innerHTML = msg;
    messages.appendChild(m); // append message
    messages.scrollTop = messages.scrollHeight; // scroll to the bottom
  });
}
