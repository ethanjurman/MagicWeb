var players = [];

// PLAYER STUFF
function Player (id, deck) {
  this.id = id;
  this.deck = deck;
  this.hand = [];
  this.graveyard = [];
  this.exile = [];
}

Player.prototype.draw = function(drawSize){
  var drawSize = drawSize || 1;
  while(drawSize-- > 0){
    var cardId = this.deck.pop();
    this.hand.push(cardId);
    addCardToHand(cardId);
  }
}

Player.prototype.shuffle = function(){
  this.deck = shuffleArray(this.deck);
}

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
