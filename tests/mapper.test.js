const { expect } = require("@jest/globals");
const { tiles } = require("../src/enums/tiles");

const { Player } = require("../src/models/player");
const { World } = require("../src/models/world");
const { countOccurrences } = require("./util");

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
  expect(countOccurrences(p1, tiles.PLAYER)).toEqual(1);
  expect(p1[0]).toContain(tiles.PLAYER);
  player.moveDown();
  const p2 = player.getMapWithPlayer();
  expect(countOccurrences(p2, tiles.PLAYER)).toEqual(1);
  expect(p2[1]).toContain(tiles.PLAYER);
});
