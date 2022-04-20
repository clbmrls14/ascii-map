const { tiles } = require("../enums/tiles");

class World {
  #cols;
  #rows;
  #seed;
  world = [];

  constructor(
    cols = 5,
    rows = 5,
    seed = [tiles.PLAIN, tiles.PLAIN, tiles.PLAIN, tiles.WATER, tiles.MOUNT]
  ) {
    this.#cols = cols;
    this.#rows = rows;
    this.#seed = seed;

    this.world = this.generateMap();
  }

  generateMap = () => {
    let mapArr = Array.from(Array(this.#rows), () => new Array(this.#cols));
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        let possibleTiles = JSON.parse(JSON.stringify(this.#seed));

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
}

module.exports = { World };
