import React, { Component } from 'react';

const ATTRIBUTES = {
  COLORS: {
    1: "RED",
    2: "PURPLE",
    3: "GREEN",
  },
  PATTERN: {
    1: "EMPTY",
    2: "SOLID",
    3: "STRIPED",
  },
  SHAPE: {
    1: "DIAMOND",
    2: "OVAL",
    3: "SQUIGGLE",
  },
}

class Card extends Component {
  render() {
    const color = ATTRIBUTES.COLORS[this.props.color];
    const pattern = ATTRIBUTES.PATTERN[this.props.pattern];
    const shape = ATTRIBUTES.SHAPE[this.props.shape];
    const imageFileName = `images/${shape}_${color}_${pattern}.png`;

    const imageAssets = [];
    for (let i = 0; i < this.props.number; i++) {
      imageAssets.push(<img className="card__element" key={i} src={imageFileName} height={75}/>)
    }

    return (
      <div className="card">
        {imageAssets}
      </div>
    );
  }
};

export default Card;
