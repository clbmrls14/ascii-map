const { expect } = require("@jest/globals");
const { tiles } = require("../src/enums/tiles");
const { Happening } = require("../src/models/happening");

const { Player } = require("../src/models/player");
const { Tile } = require("../src/models/tile");
const { World } = require("../src/models/world");
const util = require("./util");

test("Test map size created", () => {
  const world = new World(10, 5);
  expect(world.world.length).toEqual(5);
  expect(world.world[0].length).toEqual(10);
});

test("Test move player", () => {
  const world = new World(10, 5);
  const player = new Player(world);
  player.moveRight();
  player.moveDown();
  expect(player.row).toEqual(1);
  expect(player.column).toEqual(1);
});

test("Test player can't go off the map", () => {
  const world = new World(10, 5);
  const player = new Player(world);
  player.moveUp();
  expect(player.row).toEqual(0);
  expect(player.column).toEqual(0);
  player.moveLeft();
  expect(player.row).toEqual(0);
  expect(player.column).toEqual(0);
});

test("Test one and only one player on map", () => {
  const world = new World(10, 5);
  const player = new Player(world);
  const p1 = player.getMapWithPlayer();
  expect(util.countOccurrences(p1, tiles.PLAYER)).toEqual(1);
  player.moveDown();
  const p2 = player.getMapWithPlayer();
  expect(util.countOccurrences(p2, tiles.PLAYER)).toEqual(1);
});

test("Test complete event", () => {
  const world = new World(10, 5);
  const player = new Player(world);
  player.world.world[0][0] = new Tile(
    tiles.PLAIN,
    new Happening("Test", () => {
      console.log("Test happening occurred");
      return true;
    })
  );
  player.checkHappening();
  expect(player.world.world[0][0].happening.isCompleted).toBeTruthy();
});
