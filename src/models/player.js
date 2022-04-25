const { Tiles } = require("../enums/tiles");

class Player {
    world;
    column;
    row;
    health;
    inventory;
    weapon = null;

    constructor(
        world,
        column = 0,
        row = 0,
        health = 10,
        inventory = [],
        weapon = null
    ) {
        this.world = world;
        this.column = column;
        this.row = row;
        this.health = health;
        this.inventory = inventory;
        this.weapon = weapon;
    }

    moveUp = () => {
        if (this.row - 1 >= 0) {
            this.row = this.row - 1;
        }
    };

    moveDown = () => {
        if (this.row + 1 < this.world.world.length) {
            this.row = this.row + 1;
        }
    };

    moveLeft = () => {
        if (this.column - 1 >= 0) {
            this.column = this.column - 1;
        }
    };

    moveRight = () => {
        if (this.column + 1 < this.world.world[0].length) {
            this.column = this.column + 1;
        }
    };

    checkHappening = () => {
        this.world.world[this.row][this.column].happening.handleHappening(this);
    };

    attack = () => {
        if (this.weapon === null) {
            return 1;
        }
        return this.weapon.rollDamage + 1;
    };

    getMapWithPlayer = () => {
        let playerMap = JSON.parse(JSON.stringify(this.world.world));
        playerMap[this.row][this.column].type = Tiles.PLAYER;

        return playerMap;
    };
}

module.exports = { Player };
