import React, { Component, PropTypes } from 'react';

import Cards from './Cards';
import Deck from '../utils/Deck';
import GameModes from '../utils/GameModes';

const NUM_CARDS_IN_ROW = 3;
const MIN_CARDS_ON_TABLE = 12;

const MESSAGING = {
  set: "You just found a set!",
  badSet: "That's not a set!",
  default: "",
}

class Table extends Component {
  constructor(props) {
    super(props);

    const deck = new Deck(MIN_CARDS_ON_TABLE);
    deck.initTable();

    this.state = {
      deck: deck,
      numOfFoundSets: 0,
      gameMode: GameModes.original,
    };
  }

  verifySet(set) {
    const { deck, numOfFoundSets, gameMode } = this.state;

    if (gameMode.verify(set)) {
      deck.findSet(set);
      this.setState({
        numOfFoundSets: numOfFoundSets + 1,
        message: 'set',
      });
    } else {
      this.setState({
        message: 'badSet',
      });
    }
  }

  startNewGame() {
    const newDeck = new Deck(MIN_CARDS_ON_TABLE);
    newDeck.initTable();

    this.setState({
      deck: newDeck,
      numOfFoundSets: 0,
      message: 'default',
    });
  }

  dealMoreCards() {
    for (let i = 0; i < NUM_CARDS_IN_ROW; i++) {
      this.state.deck.drawCard();
    }

    this.forceUpdate();
  }

  render() {
    const message = MESSAGING[this.state.message || 'default'];
    return (
      <div className="table">
        <div className="table--playing-area">
          <div className="messaging error">{message}</div>
          <Cards
            deck={this.state.deck}
            numCardsInRow={NUM_CARDS_IN_ROW}
            numCardsInASet={this.state.gameMode.setSize}
            verifySet={(set) => this.verifySet(set)}
          />
        </div>
        {this.renderTableControls()}
      </div>
    );
  }

  renderTableControls() {
    return (
      <div className="table--controls">
        <input
          type="button"
          value="New Game"
          className="btn btn-red"
          onClick={(e) => this.startNewGame(e)} />
        <input
          type="button"
          value="Deal More Cards"
          className="btn btn-green"
          onClick={(e) => this.dealMoreCards(e)}
        />
        <input type="button" value="Switch Mode" className="btn btn-purple disabled" />

        <div className="stats">
          <div className="sets-found">
            <span className="stat--name">Sets Found:</span> {this.state.numOfFoundSets}
          </div>
          <div className="cards-remaining">
            <span className="stat--name">Cards Remaining:</span> {this.state.deck.cards.length}
          </div>
        </div>
      </div>
    );
  }
};

export default Table;
