const { tiles } = require("./enums/tiles");
const { directions } = require("./enums/directions");

const STARTING_SEED = [
  tiles.PLAIN,
  tiles.PLAIN,
  tiles.PLAIN,
  tiles.WATER,
  tiles.MOUNT,
];

const generateMap = (x = 10, y = 5, seed = STARTING_SEED) => {
  var mapArr = Array.from(Array(y), () => new Array(x));
  for (var i = 0; i < y; i++) {
    for (var j = 0; j < x; j++) {
      var possibleTiles = seed;

      if (j - 1 >= 0) {
        possibleTiles.push(mapArr[i][j - 1]);
      }
      if (i - 1 >= 0) {
        possibleTiles.push(mapArr[i - 1][j]);
      }
      if (j - 1 >= 0 && i - 1 >= 0) {
        possibleTiles.push(mapArr[i - 1][j - 1]);
      }

      const rand = Math.floor(Math.random() * possibleTiles.length);
      mapArr[i][j] = possibleTiles[rand];
    }
  }
  return mapArr;
};

const movePlayer = (mapArr, x, y, direction) => {
  switch (direction) {
    case directions.UP:
      if (y - 1 >= 0) {
        return [x, y - 1];
      }
      break;
    case directions.DOWN:
      if (y + 1 < mapArr.length) {
        return [x, y + 1];
      }
      break;
    case directions.LEFT:
      if (x - 1 >= 0) {
        return [x - 1, y];
      }
      break;
    case directions.RIGHT:
      if (x + 1 < mapArr[y].length) {
        return [x + 1, y];
      }
      break;
    default:
      console.log("Unable to move that direction");
      break;
  }
  return [x, y];
};

module.exports = {
  generateMap,
  movePlayer,
};
