import Card from './Card';

class Deck {
  constructor() {
    this.cards = [];
    this.removedCards = [];

    this.initCards();
  }

  initCards() {
    const possibleValues = [1, 2, 3];

    let nextCard;
    possibleValues.forEach((color) => {
      possibleValues.forEach((number) => {
        possibleValues.forEach((pattern) => {
          possibleValues.forEach((shape) => {
            nextCard = new Card(color, number, pattern, shape);
            this.cards.push(nextCard);
          });
        });
      });
    });
  }

  drawCard() {
    const index = Math.floor(Math.random() * this.cards.length);
    const card = this.cards.splice(index, 1)[0];
    this.removedCards.push(card);

    return card;
  }

  getCards() {
    return this.cards;
  }

}

export default Deck;
