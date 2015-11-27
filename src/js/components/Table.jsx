import React, { Component, PropTypes } from 'react';

import Cards from './Cards';
import Deck from '../utils/Deck';

const GAME_MODES = {
  ORIGINAL: 0,
  GHOST: 1,
}

const ATTRIBUTES = ['color', 'number', 'pattern', 'shape'];

const MESSAGING = {
  set: "You just found a set!",
  badSet: "That's not a set!",
  default: "",
}

class Table extends Component {
  constructor(props) {
    super(props);

    const deck = new Deck();
    deck.initTable(12);

    this.state = {
      deck: deck,
      numOfFoundSets: 0,
      gameMode: GAME_MODES.ORIGINAL,
    };
  }

  verifySet(set) {
    const { deck, numOfFoundSets, gameMode } = this.state;

    if (gameMode === GAME_MODES.ORIGINAL) {
      let attrValueArray, numDistinctValues;
      const isSet = ATTRIBUTES.reduce((prevValue, attr) => {
        attrValueArray = set.map((card) => {
          return card[attr];
        });
        numDistinctValues = (new Set(attrValueArray)).size;
        return prevValue && (numDistinctValues === 1 || numDistinctValues === attrValueArray.length);
      }, true);

      if (isSet) {
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
    } else {
      console.log('ghost set is not implemented yet')
    }
  }

  render() {
    const message = MESSAGING[this.state.message || 'default'];
    return (
      <div className="table">
        <div className="table--playing-area">
          <div className="messaging error">{message}</div>
          <Cards
            deck={this.state.deck}
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
        <input type="button" value="New Game" className="btn btn-red" />
        <input type="button" value="Deal More Cards" className="btn btn-green" />
        <input type="button" value="Switch Mode" className="btn btn-purple" />

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
