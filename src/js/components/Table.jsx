import React, { Component, PropTypes } from 'react';

import Cards from './Cards';
import Deck from '../utils/Deck';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: new Deck(),
    };
  }

  render() {
    return (
      <div>
        <Cards deck={this.state.deck} mode="regular" />
      </div>
    );
  }
};

export default Table;
