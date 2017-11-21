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
  str += `<li class = "card"><i class="fa ${cards_all[i].name}"></i></li>`;
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
 var counter = 0;//初始化计次器
 var intr;
 var hour,minute,second;//时 分 秒
 hour=minute=second=0;//初始化
 var millisecond=0;//毫秒
 var star = 3;
//核心功能实现
 $(document).ready(function(){
   //主要功能的实现，点击卡牌之后即翻面，点击第二张之后进行判断是否一致，如果一致则标记为martch，如果不一致则两张卡牌均回到初始状态
   $(".card").click(function(){
     $(this).animate({"width":"135","height":"135"},100);
     $(this).animate({"width":"125","height":"125"},100);

     if (open_card.length < 2){
       counter++;
       $(".moves").html(counter.toString());
       //第一次点击
       if(counter === 1){
         intr = setInterval(timer,50);
       }

       if($(this).attr("class").indexOf("open show") == -1 && $(this).attr("class").indexOf("match") == -1) {
         open_card.push($(this).children().attr("class"));
         $(this).addClass("open show");
         console.log(open_card[0],open_card[1])

         if(open_card.length === 2){

           if (open_card[0] != open_card[1]){
                 $(".card.open.show").addClass('nomatch');
                 setTimeout(
                   function (){
                     $(".card.open.show").removeClass("open show nomatch");
                   },500);
                 }
                 else {
                  $(".card.open.show").removeClass("open show").addClass("match");

                  if($(".match").size() == 16){
                    intr = window.clearInterval(intr);
                    setTimeout(
                      function (){
                        con = confirm("你赢啦，真厉害，你的星级为" + star.toString() + " 完成时间为"+ $(".clock").html() +"点击确定重新进行游戏哦~");
                        if(con === true){
                          location.replace(location.href);
                        }
                      },1000);
                  }
               }
               setTimeout(
                 function (){
                   open_card.splice(0,open_card.length);
                 },500);

             }

         }
       }
     });
   //重新玩游戏
   $(".restart").click(function(){
     location.replace(location.href);
   });
 });

 function timer()//计时
 {
    millisecond=millisecond+50;

    if(millisecond>=1000)
    {
        millisecond=0;
        second=second+1;
    }

    if(second>=60)
    {
        second=0;
        minute=minute+1;
    }

    if(minute>=60)
    {
        minute=0;
        hour=hour+1;
    }
    $(".clock").html('计时: '+hour+'时'+minute+'分'+second+'秒'+millisecond+'毫秒');
    //星级展示，小于18次3星，点击超过18次2星，超过36次1星
    if( counter > 36) {
      $(".stars").html('<li><i class="fa fa-star"></i></li>');
      star = 1;
    }
    else if( counter > 18) {
           $(".stars").html('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>');
           star = 2;
    }
  }
