const ATTRIBUTES = ['color', 'number', 'pattern', 'shape'];

const GameModes = {
  original: {
    setSize: 3,
    verify: (set) => {
      const isSet = ATTRIBUTES.reduce((prevVal, attr) => {
        let numDistinctValues = set.map((card) => {
          return card[attr];
        }).reduce((attrSet, nextVal) => {
          attrSet.add(nextVal);
          return attrSet;
        }, new Set()).size;

        return prevVal && (numDistinctValues === 1 || numDistinctValues === set.length);
      }, true);

      return isSet;
    }
  },

  ghostSet: {
    setSize: 6,
    verify: (set) => {

    }
  }
}

export default GameModes;
