const { Actions } = require("../enums/actions");
const { Directions } = require("../enums/directions");
const { Tiles } = require("../enums/tiles");

class Player {
    world;
    column;
    row;
    health;
    inventory;
    isBusy;
    weapon = null;

    constructor(
        world,
        column = 0,
        row = 0,
        health = 10,
        inventory = [],
        isBusy = false,
        weapon = null
    ) {
        this.world = world;
        this.column = column;
        this.row = row;
        this.health = health;
        this.inventory = inventory;
        this.isBusy = isBusy;
        this.weapon = weapon;
    }

    move = (direction) => {
        if (!this.isBusy) {
            switch (direction) {
                case Directions.UP:
                    if (this.row - 1 >= 0) {
                        this.row = this.row - 1;
                    }
                    break;
                case Directions.DOWN:
                    if (this.row + 1 < this.world.world.length) {
                        this.row = this.row + 1;
                    }
                    break;
                case Directions.LEFT:
                    if (this.column - 1 >= 0) {
                        this.column = this.column - 1;
                    }
                    break;
                case Directions.RIGHT:
                    if (this.column + 1 < this.world.world[0].length) {
                        this.column = this.column + 1;
                    }
                    break;
                default:
                    break;
            }
        }
    };

    checkHappening = (action = Actions.DEFAULT) => {
        this.world.world[this.row][this.column].happening.handleHappening(
            this,
            action
        );
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
