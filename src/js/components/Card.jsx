import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

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

const propTypes = {
  isSelected: PropTypes.bool,
  selectCard: PropTypes.func,
};

const defaultProps = {
  isSelected: false,
  selectCard: () => {},
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  onMouseEnter(e) {
    this.setState({
      isHovered: true,
    });
  }

  onMouseLeave(e) {
    this.setState({
      isHovered: false,
    });
  }

  onClick(e) {
    this.props.selectCard(this.props.card);
  }

  render() {
    const { card, isSelected } = this.props;
    const color = ATTRIBUTES.COLORS[card.color];
    const pattern = ATTRIBUTES.PATTERN[card.pattern];
    const shape = ATTRIBUTES.SHAPE[card.shape];
    const imageFileName = `images/${shape}_${color}_${pattern}.png`;

    const imageAssets = [];
    for (let i = 0; i < card.number; i++) {
      imageAssets.push(<img className="card__element" key={i} src={imageFileName} height={75}/>)
    }

    const className = cx('card', {
      hover: this.state.isHovered,
      selected: isSelected,
    });

    return (
      <div
        className={className}
        onMouseEnter={(e) => this.onMouseEnter(e)}
        onMouseLeave={(e) => this.onMouseLeave(e)}
        onClick={(e) => this.onClick(e)}
      >
        {imageAssets}
      </div>
    );
  }
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
