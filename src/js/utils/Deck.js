import Card from './Card';

class Deck {
  constructor(gameMode, tableSize) {
    this.gameMode = gameMode;
    this.tableSize = tableSize;

    this.cards = [];
    this.visibleCards = [];
    this.possibleSets = [];
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

    this.findAllPossibleSets();
  }

  findAllPossibleSets() {
    this.possibleSets = [];

    let i = 0, j = 1, k = 2;
    while (i < this.visibleCards.length) {
      while (j < this.visibleCards.length) {
        while (k < this.visibleCards.length) {
          let possibleSet = [this.visibleCards[i], this.visibleCards[j], this.visibleCards[k]];
          if (this.gameMode.verify(possibleSet)) this.possibleSets.push(possibleSet);
          k++;
        }
        j++;
        k = j + 1;
      }
      i++;
      j = i + 1;
      k = j + 1;
    }
  }

  drawCard() {
    if (this.cards.length > 0) {
      const index = Math.floor(Math.random() * this.cards.length);
      const card = this.cards.splice(index, 1)[0];
      this.visibleCards.push(card);

      return card;
    }
  }

  dealMoreCards(numOfCards) {
    for (let i = 0; i < numOfCards; i++) {
      this.drawCard();
    }

    this.findAllPossibleSets();
  }

  findSet(set) {
    this.foundSets.push(set);
    set.forEach((card) => {
      this.visibleCards.splice(this.visibleCards.indexOf(card), 1);
    });

    while (this.visibleCards.length < this.tableSize && this.cards.length > 0) {
      if (this.cards.length) this.drawCard();
    }

    this.findAllPossibleSets();
  }
}

export default Deck;
