class Card {
  constructor(color, number, pattern, shape) {
    this.color = color;
    this.number = number;
    this.pattern = pattern;
    this.shape = shape;
  }

  getKey() {
    return `${this.color}${this.number}${this.pattern}${this.shape}`;
  }
}

export default Card;
