import React, { Component, PropTypes } from 'react';

import Cards from './Cards';
import Deck from '../utils/Deck';

const GAME_MODES = {
  ORIGINAL: 0,
  GHOST: 1,
}

const ATTRIBUTES = ['color', 'number', 'pattern', 'shape'];

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: new Deck(),
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
        });
      }
    } else {
      console.log('ghost set is not implemented yet')
    }
  }

  render() {
    return (
      <div className="table">
        <Cards
          deck={this.state.deck}
          verifySet={(set) => this.verifySet(set)} />
      </div>
    );
  }
};

export default Table;
