const { Player } = require("./src/models/player");
const { World } = require("./src/models/world");

const printMap = (worldMap) => {
  var mapStr = "";

  worldMap.forEach((row) => {
    row.forEach((tile) => (mapStr += String.fromCharCode(tile.type)));
    mapStr += "\n";
  });

  console.log(mapStr);
};

const world = new World();
const player = new Player(world);

printMap(player.getMapWithPlayer());

// player.moveRight();

// printMap(player.getMapWithPlayer());
