/*
 * Create a list that holds all of your cards (Done)
 */
let card = document.getElementsByClassName("card");
let cards = [...card];

let openCard = [];
 const deck = document.querySelector(".deck");
 let firstIcon='';
 let secondIcon='';
 let matchedCards =[];
//  move variable declaration
let moves = 0;
let counter = document.querySelector(".moves");

//Timer Decleartion
let second = 00, minute = 00; hour = 00;
let timer = document.querySelector(".timer");
let interval;

//  modal veriabls 
const modal = document.getElementById('myModal');
const modalCloseBtn = document.querySelector('.modalClose');
const modalReplayBtn = document.querySelector('.modalReplay');
const modalTime=document.querySelector('.modalTime');
const modalRating=document.querySelector('.rating');
const modalMoves=document.querySelector('.modalMoves');
modalCloseBtn.addEventListener('click',colseModal);

const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;


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


function startGame() {
    cards = shuffle(cards);

    for (var i = 0; i < cards.length; i++){
        cards[i].addEventListener("click",displayCards);
    }

    
    //Refrence: https://stackoverflow.com
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);

        });
       // empty  array
      cards[i].classList.remove("show", "open", "match", "unmatch");

    }




// reset the moves
moves = 0;
counter.innerHTML = moves;
//reset rating
starsContainer.innerHTML = star + star + star;
// reset the timer to zero
second = 00;
minute = 00;
hour=00;
timer.innerHTML=hour + ":"+minute + ":" + second;
//Stop timer
clearInterval(interval);


}

startGame();

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

function displayCards(){
    // this condition for brevent match when duble click on cards 
  if(!this.classList.contains("open")){
   
   
this.classList.toggle("open");
this.classList.toggle("show");

if(firstIcon==''){
    openCard.push(this);

    firstIcon=openCard[0].querySelector('i').className;  
    
}
else if (firstIcon!=''){
    openCard.push(this);
    secondIcon=openCard[1].querySelector('i').className;  

    

    if (firstIcon==secondIcon){
        openCard[0].classList.add("match");
        openCard[1].classList.add("match");
        
        openCard[0].removeEventListener("click",displayCards ); 
        openCard[1].removeEventListener("click",displayCards ); 
       console.log("match");
       firstIcon='';
       secondIcon='';
       openCard = []; 
       congrats();
    }
   else if(firstIcon!=secondIcon)
    {
        openCard[0].classList.add("unmatch");
        openCard[1].classList.add("unmatch");

      
        firstIcon='';
        secondIcon='';
        setTimeout(function(){
            openCard[0].classList.remove("show", "open", "unmatched");
            openCard[1].classList.remove("show", "open", "unmatched");
            
            openCard = []; 
        },600);
         addMove();
    
      }
     
     
       }   }   
}

counter.innerHTML = 0;

function addMove() {

    moves++;
    counter.innerHTML = moves;

if(moves == 1){

    startTimer();

}

    rating();

}



function startTimer(){


interval = setInterval(function() {
timer.innerHTML=hour + ":"+minute + ":" + second;
    second++;
    if (second == 60) {
        minute++;
        second = 0;
    }
    if (minute == 60) {
        hour++;
        minute = 0;
    }
  }, 500);

}


// rating


starsContainer.innerHTML = star + star + star;
function rating() {
    if( moves < 15) {
        starsContainer.innerHTML = star + star + star;
    }
     else if( moves < 20) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}   






matchedCards = document.getElementsByClassName("match");

function congrats() {
    if(matchedCards.length === 16) {
        openModal();
     clearInterval(interval);
       
    }
}

function openModal(){
    
    modalTime.innerHTML=hour + ":" + minute + ":" + second;;
    modalMoves.innerHTML=moves;
   var starRating = document.querySelector(".stars").innerHTML;
    modalRating.innerHTML=starRating;
    modalReplayBtn.addEventListener('click', replyGame);
   modal.style.display = "block";
   
}
function replyGame(){
    colseModal();
    startGame();
  
}


function colseModal(){
    modal.style.display = 'none';
}
