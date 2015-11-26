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

class Table extends Component {
  constructor(props) {
    super(props);

    const cards = [];
    for (let i = 0; i < this.props.minNumOfCards; i++) {
      cards.push(this.props.deck.drawCard());
    };

    this.state = {
      visibleCards: cards,
    };
  }

  render() {
    return (
      <div>
        {this.renderCards()}
      </div>
    );
  }

  renderRowOfCards(row, index) {
    const cardsInRow = [];
    row.forEach((card) => {
      let cardKey = `${card.color},${card.number},${card.pattern},${card.shape}`;
      cardsInRow.push(<Card
                  key={cardKey}
                  color={card.color}
                  number={card.number}
                  pattern={card.pattern}
                  shape={card.shape} />);
    });
    return (
      <div key={index}>
        {cardsInRow}
      </div>
    )
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
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
