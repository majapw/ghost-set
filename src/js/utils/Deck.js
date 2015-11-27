import Card from './Card';

class Deck {
  constructor(tableSize) {
    this.tableSize = tableSize;
    this.cards = [];
    this.visibleCards = [];
    this.foundSets = [];

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

  initTable() {
    for (let i = 0; i < this.tableSize; i++) {
      this.drawCard();
    };
  }

  drawCard() {
    if (this.cards.length > 0) {
      const index = Math.floor(Math.random() * this.cards.length);
      const card = this.cards.splice(index, 1)[0];
      this.visibleCards.push(card);

      return card;
    }
  }

  getCards() {
    return this.cards;
  }

  findSet(set) {
    this.foundSets.push(set);
    set.forEach((card) => {
      this.visibleCards.splice(this.visibleCards.indexOf(card), 1);
    });

    while (this.visibleCards.length < this.tableSize && this.cards.length > 0) {
      if (this.cards.length) this.drawCard();
    }
  }
}

export default Deck;
