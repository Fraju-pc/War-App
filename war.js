//setting the card parameters
class Card {
    constructor(suit, rank) {
      this.suit = suit;
      this.rank = rank;
    }
  }

  //building the deck
  class Deck {
    constructor() {
      //Array to hold card object with ranks and suits
      this.cards = [];
      let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
      //creating the cards
      for (let suit of suits) {
        for (let rank of ranks) {
          this.cards.push(new Card(suit, rank));
        }
      }
      //console.log(this.cards);
    }
    // shuffle the deck with a RNG
    shuffle() {
      for(let i = 0; i < this.cards.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
    //deal the cards to each players hand
    dealCards(player1, player2) {
      while (this.cards.length > 0) {
        player1.takeCard(this.cards.pop());
        player2.takeCard(this.cards.pop());
      }
    }
  }

  //setting the player class and methods
  class Player {
    constructor(name) {
      this.name = name;
      this.points = 0;
      this.hand = [];
    }
    //takes card from deck and pushes to hand
    takeCard(card) {
      this.hand.push(card);
    }
    //plays card from player hand
    playCard() {
      return this.hand.pop();
    }
    //point accumulator
    addPoints(points) {
      this.points += points;
    }
  
  }
  
  //main class for the game itself!
  class War {
    constructor(player1Name, player2Name) {
      this.player1 = new Player(player1Name);
      this.player2 = new Player(player2Name);
      this.deck = new Deck();
    }
  
    start() {
      this.deck.shuffle();
      this.deck.dealCards(this.player1, this.player2);
      //main loop for the game
      while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
        this.playRound();
      }
      this.displayScore();
    }
    //play a hand
    playRound() {
      let player1Card = this.player1.playCard();
      let player2Card = this.player2.playCard();
      let comp = this.compareCards(player1Card, player2Card);
    
      //display the hand played
      console.log(`${this.player1.name} plays a ${player1Card.rank} of ${player1Card.suit},  ${this.player2.name} plays a ${player2Card.rank} of ${player2Card.suit}!`)
      let gameLog =`${this.player1.name} plays a ${player1Card.rank} of ${player1Card.suit},  ${this.player2.name} plays a ${player2Card.rank} of ${player2Card.suit}!` + '<br>' 
      //find and display the results of the hand. If player 1's hand is larger the comp value will be greater than 0
      //if Player2's hand is larger the comp value will be less than 0. A 0 represents a tie
      if (comp > 0) {
        this.player1.addPoints(1);
        console.log(`${this.player1.name} wins the round with ${player1Card.rank} of ${player1Card.suit}!`);
        gameLog += `${this.player1.name} wins the round with ${player1Card.rank} of ${player1Card.suit}!` + "<br>";
      } else if (comp < 0) {
        this.player2.addPoints(1);
        console.log(`${this.player2.name} wins the round with ${player2Card.rank} of ${player2Card.suit}!`);
        gameLog += `${this.player2.name} wins the round with ${player2Card.rank} of ${player2Card.suit}!` + "<br>";
      } else {
        console.log(`It's a tie! Both players played a ${player1Card.rank}.`);
        gameLog += `It's a tie! Both players played a ${player1Card.rank}.` + "<br>";
      }
      //Html output
      document.getElementById("game-log").innerHTML += gameLog;
    }
    
    //rank and compare cards using index to determine value
    compareCards(card1, card2) {
      let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
      //console.log(ranks.indexOf(card1.rank));
      return values.indexOf(card1.rank) - values.indexOf(card2.rank);
    }
  
    displayScore() {
      //display score after the deck is exhausted
      console.log(`The game is over! ${this.player1.name} scored ${this.player1.points} points, and ${this.player2.name} scored ${this.player2.points}`);
      //html display
      
      let finalScore = "<br>" + `The game is over! ${this.player1.name} scored ${this.player1.points} points, and ${this.player2.name} scored ${this.player2.points}`
      document.getElementById("game-display").innerHTML = finalScore + '<br><br>'
      //determin the winner
      let gameWinner = "";
      if (this.player1.points > this.player2.points){
        console.log(`${this.player1.name} is the Winner!`);
        gameWinner = `${this.player1.name} is the Winner!`;
      } else if(this.player1.points < this.player2.points){
        console.log(`${this.player2.name} is the Winner!`);
        gameWinner = `${this.player2.name} is the Winner!`
      } else {
        console.log(`The game ends in a Tie!`);
        gameWinner = `The game ends in a Tie!`
      }
      //Display to HTML
      document.getElementById("game-display").innerHTML = finalScore + '<br><br>' + gameWinner;
    }
  }


//Main Function Call
let gameOfWar = new War('Patrick', "Johnny");
gameOfWar.start();
  