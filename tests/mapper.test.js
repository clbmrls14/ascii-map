const { expect } = require("@jest/globals");
const mapper = require("../src/mapper");

const { directions } = require("../src/enums/directions");

test("Test map size created", () => {
  const testMap = mapper.generateMap(10, 5);
  expect(testMap.length).toEqual(5);
  expect(testMap[0].length).toEqual(10);
});

test("Test move player", () => {
  const testMap = mapper.generateMap(10, 5);
  var playerX = 0;
  var playerY = 0;
  [playerX, playerY] = mapper.movePlayer(
    testMap,
    playerX,
    playerY,
    directions.RIGHT
  );
  [playerX, playerY] = mapper.movePlayer(
    testMap,
    playerX,
    playerY,
    directions.DOWN
  );
  expect(playerX).toEqual(1);
  expect(playerY).toEqual(1);
});

test("Test player can't go off the map", () => {
  const testMap = mapper.generateMap(10, 5);
  var playerX = 0;
  var playerY = 0;
  [playerX, playerY] = mapper.movePlayer(
    testMap,
    playerX,
    playerY,
    directions.UP
  );
  expect(playerX).toEqual(0);
  expect(playerY).toEqual(0);
  [playerX, playerY] = mapper.movePlayer(
    testMap,
    playerX,
    playerY,
    directions.LEFT
  );
  expect(playerX).toEqual(0);
  expect(playerY).toEqual(0);
});
