const { expect } = require("@jest/globals");
const { Actions } = require("../src/enums/actions");
const { Directions } = require("../src/enums/directions");
const { PlainHappenings } = require("../src/enums/happenings");
const { Items } = require("../src/enums/items");
const { Tiles } = require("../src/enums/tiles");
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
    player.move(Directions.RIGHT);
    player.move(Directions.DOWN);
    expect(player.row).toEqual(1);
    expect(player.column).toEqual(1);
});

test("Test player can't go off the map", () => {
    const world = new World(10, 5);
    const player = new Player(world);
    player.move(Directions.UP);
    expect(player.row).toEqual(0);
    expect(player.column).toEqual(0);
    player.move(Directions.LEFT);
    expect(player.row).toEqual(0);
    expect(player.column).toEqual(0);
});

test("Test one and only one player on map", () => {
    const world = new World(10, 5);
    const player = new Player(world);
    const p1 = player.getMapWithPlayer();
    expect(util.countOccurrences(p1, Tiles.PLAYER)).toEqual(1);
    player.move(Directions.DOWN);
    const p2 = player.getMapWithPlayer();
    expect(util.countOccurrences(p2, Tiles.PLAYER)).toEqual(1);
});

test("Test complete happening", () => {
    const world = new World(10, 5);
    const player = new Player(world);
    player.world.world[0][0] = new Tile(
        Tiles.PLAIN,
        new Happening("Test", () => {
            console.log("Test happening occurred");
            return { message: "Test done", actions: [], isCompleted: true };
        })
    );
    player.checkHappening();
    expect(player.world.world[0][0].happening.isCompleted).toBeTruthy();
});

test("Test adding item to inventory with happening", () => {
    const world = new World(10, 5);
    const player = new Player(world);
    player.world.world[0][0] = new Tile(
        Tiles.PLAIN,
        new Happening("Test", PlainHappenings.FIND_RUSTY_KEY)
    );
    player.checkHappening();
    expect(player.inventory).toContain(Items.RUSTY_KEY);
});

test("Test cannot move while event in progress", () => {
    const world = new World(10, 5);
    const player = new Player(world);
    player.world.world[0][0] = new Tile(
        Tiles.PLAIN,
        new Happening("Test get key", PlainHappenings.FIND_RUSTY_KEY)
    );
    player.world.world[0][1] = new Tile(
        Tiles.PLAIN,
        new Happening("Test find door", PlainHappenings.RUSTY_DOOR)
    );
    player.checkHappening();
    player.move(Directions.RIGHT);
    player.checkHappening();
    player.move(Directions.LEFT);
    expect(player.column).toEqual(1);
    expect(player.row).toEqual(0);
});

test("Test happening checks inventory and removes a an item if condition is met", () => {
    const world = new World(10, 5);
    const player = new Player(world);
    player.world.world[0][0] = new Tile(
        Tiles.PLAIN,
        new Happening("Test get key", PlainHappenings.FIND_RUSTY_KEY)
    );
    player.world.world[0][1] = new Tile(
        Tiles.PLAIN,
        new Happening("Test find door", PlainHappenings.RUSTY_DOOR)
    );
    player.move(Directions.RIGHT);
    player.checkHappening();
    expect(player.world.world[0][1].happening.isCompleted).toBeFalsy();
    player.move(Directions.LEFT);
    player.checkHappening();
    player.move(Directions.RIGHT);
    player.checkHappening(Actions.YES);
    expect(player.inventory).toContain(Items.DAGGER);
    expect(player.inventory).toHaveLength(1);
});
