const expect = chai.expect
const assert = chai.assert


describe('Week 6 Coding Assignment War:', () => {
    
  
    describe('Deck of Cards', () => {
      it('#Should return an array of 52 Objects', () => {
        
      let cards = [];
      let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
      //creating the cards
      for (let suit of suits) {
        for (let rank of ranks) {
          cards.push(new Card(suit, rank));
        }
      }

console.table(cards);

        expect(cards.length).to.equal(52);
      })
    })
  
  })