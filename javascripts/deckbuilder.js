// need a deck to do stuff
var deck = [];

function search(search){
  httpGet("http://api.mtgdb.info/search/" + search.replace(/\s/g,"%20"),fillSearch);
}

function fillSearch(json){
  var cards = JSON.parse(json);
  cards = searchFilter(cards);
  document.getElementById("search-results").innerHTML = "";
  for (var i = 0; i < cards.length; i++){
    var card = makeCardImage(cards[i].id,"search-img");
    card.setAttribute("onclick","addToDeck("+cards[i].id+")");
    document.getElementById("search-results").appendChild(card);
  }
}

function searchFilter(cards){
  var names = {};
  return Array.prototype.filter.call(cards, function(e){
    if (document.getElementById("duplicates").checked){
      if (names[e.name]){
        return false;
      } else {
        names[e.name] = true;
      }
    }
    return true;
  });
}

function makeCardImage(id,classes){
  // classes must be a list
  if (classes != "" + classes){
    classes = [classes];
  }
  // make image and return it
  var img = document.createElement("img");
  img.setAttribute("class",classes.join(" "));
  img.setAttribute("onmouseover","cardEnhance(" + id + ")");
  img.setAttribute("src","https://api.mtgdb.info/content/card_images/"+id+".jpeg");
  return img;
}

function addToDeck(id){
  deck.push(id)
  var card = makeCardImage(id,"deck-img");
  card.setAttribute("onclick","removeFromDeck(event)");
  card.setAttribute("data-id",id); // for removing the card later on
  // insert the card sorted
  var cards = document.querySelectorAll('[data-id]');
  var i = 0;
  for (i = 0; i < cards.length && cards[i].getAttribute('data-id') < id; i++){}
  if (cards.length == 0){
    document.getElementById('deck-cards').appendChild(card);
  } else {
    document.getElementById('deck-cards').insertBefore(card, cards[i]);
  }
}

function removeFromDeck(e){
  var card = (e.target) ? e.target : e.srcElement;
  deck.splice(deck.indexOf(parseInt(card.getAttribute("data-id"))),1);
  card.parentNode.removeChild(card);
}

function cardEnhance(id){
  var ec = document.getElementById("enhance-card")
  var img = document.createElement("img");
  img.setAttribute("src","http://api.mtgdb.info/content/hi_res_card_images/"+id+".jpg");
  ec.innerHTML = "";
  ec.appendChild(img);
}

function httpGet(url, func){
    var xmlHttp = null;
    xhr = new XMLHttpRequest();
    xhr.open( "GET", url, true );
    xhr.send( );
    xhr.onreadystatechange = function(){
      if (xhr.readyState==4){
        func(xhr.responseText);
      }
    }
}
