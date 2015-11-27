import React, { Component, PropTypes } from 'react';

import Card from './Card';

const propTypes = {
  numCardsInRow: PropTypes.number,
  numCardsInASet: PropTypes.number,
  verifySet: PropTypes.func,
};

const defaultProps = {
  numCardsInRow: 3,
  numCardsInASet: 3,
  verifySet: function() {},
};

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCards: [],
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

    if (selectedCards.length === this.props.numCardsInASet) {
      this.props.verifySet(selectedCards);
      setTimeout(() => {
        this.setState({
          selectedCards: [],
        });
      }, 200);
    } else {
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        {this.renderCards()}
      </div>
    );
  }

  renderCards() {
    const { numCardsInRow, deck } = this.props;
    const { visibleCards } = deck;

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
