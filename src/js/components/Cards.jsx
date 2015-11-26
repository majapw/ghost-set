import React, { Component, PropTypes } from 'react';

import Card from './Card';

const propTypes = {
  numCardsInRow: PropTypes.number,
  minNumOfCards: PropTypes.number,
};

const defaultProps = {
  numCardsInRow: 3,
  minNumOfCards: 12,
};

class Cards extends Component {
  constructor(props) {
    super(props);

    const cards = [];
    for (let i = 0; i < this.props.minNumOfCards; i++) {
      cards.push(this.props.deck.drawCard());
    };

    this.state = {
      selectedCards: [],
      visibleCards: cards,
    };
  }

  selectCard(card) {
    const { selectedCards } = this.state;

    const cardIndex = selectedCards.indexOf(card);
    if (cardIndex !== -1) {
      selectedCards.splice(cardIndex, 1);
    } else {
      selectedCards.push(card);
    }

    this.forceUpdate();
  }

  render() {
    return (
      <div>
        {this.renderCards()}
      </div>
    );
  }

  renderCards() {
    const { numCardsInRow } = this.props;
    const { visibleCards } = this.state;

    const numOfRows = Math.ceil(visibleCards.length / numCardsInRow);
    const rows = [];
    let curIndex;
    for (let i = 0; i < numOfRows; i++) {
      curIndex = i * numCardsInRow;
      rows.push(this.renderRowOfCards(visibleCards.slice(curIndex, curIndex + numCardsInRow), i));
    }

    return rows;
  }

  renderRowOfCards(row, index) {
    const cardsInRow = [];
    row.forEach((card) => {
      cardsInRow.push(<Card
                  key={card.getKey()}
                  card={card}
                  isSelected={this.state.selectedCards.indexOf(card) !== -1}
                  selectCard={() => this.selectCard(card)}
                  />);
    });
    return (
      <div key={index}>
        {cardsInRow}
      </div>
    )
  }
};

Cards.propTypes = propTypes;
Cards.defaultProps = defaultProps;

export default Cards;
