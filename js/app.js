/*
 * Create a list that holds all of your cards
 */

 //创建卡片对象
var Card =  {
   name : '',
   state : 'noth',
   createNew: function() {
   　　　　　　var card = {};
   　　　　　　Card.show = function(){ Cat.state = 'show' };
   　　　　　　Card.hide = function(){ Cat.state = 'hide'};
   　　　　　　return card;
 }
}

//创建卡牌对象数组

var cards_name = ['fa-diamond','fa-diamond',
 'fa-paper-plane-o','fa-paper-plane-o',
 'fa-anchor','fa-anchor',
 'fa-bolt','fa-bolt',
 'fa-cube','fa-cube',
 'fa-leaf','fa-leaf',
 'fa-bicycle','fa-bicycle',
 'fa-bomb','fa-bomb'];


var cards_all =  Array();

for(var i = 0; i < cards_name.length; i++){
  cards_all[i] = Card.createNew();
  cards_all[i].name = cards_name[i];
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffle(cards_all);


var str = '';
for (var i = 0; i < cards_all.length;i++){
	str += '<li class = \"card\"><i class=\"fa ' + cards_all[i].name + '\"></i></li>';
}
console.log(str);
$(".deck").html(str);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 var open_card = [];//翻开的卡牌数组，长度始终为2

 $(document).ready(function(){
   $(".card").click(function(){
     if (open_card.length < 2){
       if($(this).attr("class").indexOf("open show") == -1) {
         open_card.push($(this).children().attr("class"));
         $(this).addClass("open show");
         console.log(open_card[0],open_card[1])
         if(open_card.length == 2){
           setTimeout(
             function (){
               if (open_card[0] != open_card[1]){
                 $(".card.open.show").removeClass("open show");
                 console.log('diff');
               }
               else {
                  $(".card.open.show").removeClass("open show").addClass("match");
                  if($(".match").size() == 16){
                    alert('You Win!');
                    location.replace(location.href);
                  }
               }
               open_card.splice(0,open_card.length);
             }
             ,500);
         }
       }
     }
   });
 });
