const { directions } = require("./src/enums/directions");
const { tiles } = require("./src/enums/tiles");
const mapper = require("./src/mapper");

const mappArr = mapper.generateMap(10, 5);
var mapStr = "";
mappArr.forEach((col) => {
  col.forEach((item) => (mapStr += String.fromCharCode(item)));
  mapStr += "\n";
});

var playerX = 0;
var playerY = 0;

[playerX, playerY] = mapper.movePlayer(
  mappArr,
  playerX,
  playerY,
  directions.RIGHT
);

console.log(mapStr);
