const { Player } = require("./src/models/player");
const { World } = require("./src/models/world");

const printMap = (worldMap) => {
  var mapStr = "";

  worldMap.forEach((col) => {
    col.forEach((item) => (mapStr += String.fromCharCode(item)));
    mapStr += "\n";
  });

  console.log(mapStr);
};

const world = new World();
const player = new Player(world);

printMap(player.getMapWithPlayer());

player.moveRight();

printMap(player.getMapWithPlayer());

player.moveDown();

printMap(player.getMapWithPlayer());

player.moveLeft();

printMap(player.getMapWithPlayer());

player.moveUp();

printMap(player.getMapWithPlayer());
