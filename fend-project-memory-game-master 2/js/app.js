const allCards = document.querySelectorAll(".card");
let cards = [...allCards]
const newDeck = document.getElementById("deck-content");
const timeing = document.querySelector(".timer");
const removeStars = document.querySelector(".stars");
let cardElement = [];
let flipCardIcon = [];
let selectedCardTemp = [];
let numMoves = 0;
let correctChoice = 0;
let seconds = 0;
let minutes = 0;




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


document.body.onload = startGame();
// start the game
function startGame() {
  const restartBtn = document.querySelector('.restart');
  let timeing = 0;
  cards = shuffle(cards);
  startTimer(timeing);
  for (var i = 0; i < cards.length; i++) {
    newDeck.innerHTML = "";
    [].forEach.call(cards, function (newCard) {
      newDeck.appendChild(newCard);
    });
  }
  restartBtn.addEventListener('click', function () {
    reset();
  });
}


// eventlistener function forEach card
allCards.forEach(function (card) {
  card.addEventListener('click', function () {
    numOfMoves();
    document.querySelector(".moves").innerHTML = numMoves;
    displayCards(card);
  });
});


// number of moves
function numOfMoves() {
  numMoves++;
}


// displayCards function
function displayCards(card) {
  card.classList.add("open", "show");
  selectedCard(card);
}



// check selectedCard node && push node to array && compaire nodes to find match cards
function selectedCard(card) {
  cardElement.push(card);
  let child = card.childNodes;
  flipCardIcon.push(child[1].className);
  if (flipCardIcon.length == 2) {
    if (flipCardIcon[0] == flipCardIcon[1]) {
      correctChoice++;
      cardElement[0].classList.add("match");
      cardElement[1].classList.add("match");
      if (correctChoice == 8) {
        winGame();
        clearInterval(timeStarter);
      }
      cardElement = [];
      flipCardIcon = [];
    } else {
      showCards(cardElement);
      cardElement = [];
      flipCardIcon = [];
    }
  }
}


// delete classes if cards not matched after timeset
function showCards(cardElement) {
  if (cardElement.length == 2) {

    cardElement[0].classList.add("wrong");
    cardElement[1].classList.add("wrong");
    selectedCardTemp.push(cardElement[0]);
    selectedCardTemp.push(cardElement[1]);
    disableClick();

    if (selectedCardTemp.length <= 2) {
      const delayRedCard = () => {
        for (var i = 0; i < selectedCardTemp.length; i++) {
          selectedCardTemp[i].classList.remove("open", "show", "wrong");
        }
        enableClick();
        selectedCardTemp = [];
      };
      setTimeout(delayRedCard, 800);
    }
  }
}

// disable click when 2 wrong cards choosed
function disableClick() {
  Array.prototype.filter.call(allCards, function (card) {
    card.classList.add('disabled');
  });
}

// enable click when after set time
function enableClick() {
  Array.prototype.filter.call(allCards, function (card) {
    card.classList.remove('disabled');
  });
}

// start timer
function startTimer() {
  timeStarter = setInterval(function () {
    timeing.innerHTML = `${minutes}mins ${seconds + 1}secs !!!`;
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    starRating()
  }, 1000);
}

// remove stars rating
function starRating() {
  if (minutes == 0 && seconds == 35) {
    removeStars.removeChild(removeStars.childNodes[1]);

  } else if (minutes == 1 && seconds == 10) {
    removeStars.removeChild(removeStars.childNodes[2]);
  }
}



// win game function with massage
function winGame() {
  const removeScore = document.querySelector(".score-panel");

  while (newDeck.hasChildNodes()) {
    newDeck.removeChild(newDeck.firstChild);
  }
  removeScore.parentNode.removeChild(removeScore);
  newDeck.innerHTML = "";
  divArray = [];

  for (let i = 0; i < 4; i++) {
    let createDiv = document.createElement('div');
    createDiv.className = ('winning-container' + i);
    newDeck.appendChild(createDiv);
    divArray.push(createDiv);
  }

  removeStars.className = ('star-rating');
  const playAgainBtn = document.createElement('BUTTON');
  divArray[0].innerHTML = `CONGRATULATION`;
  divArray[1].innerHTML = `👍👍👍`;
  divArray[2].innerHTML = `You finish the game in: ${minutes}mins ${seconds}secs !!! 
                                  <br/>Number of moves: ${numMoves} 
                                  <br/>Your rating is: ${removeStars.innerHTML}`
  divArray[3] = divArray[3].appendChild(playAgainBtn);
  playAgainBtn.innerHTML = "Play Again";
  playAgainBtn.className = ('btn');
  playAgainBtn.addEventListener('click', function () {
    reset();
  });

}
// restart the game
function reset() {
  location.reload();
}





