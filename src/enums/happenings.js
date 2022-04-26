const { Items } = require("./items");

const removeItem = (inventory, item) => {
    const index = inventory.indexOf(item);
    if (index > -1) {
        inventory.splice(index, 1);
    }
    return inventory;
};

const PlainHappenings = {
    FIND_RUSTY_KEY: (player) => {
        if (!player.inventory.includes(Items.RUSTY_KEY)) {
            player.inventory.push(Items.RUSTY_KEY);
        }
        return true;
    },
    RUSTY_DOOR: (player) => {
        if (player.inventory.includes(Items.RUSTY_KEY)) {
            player.inventory = removeItem(player.inventory, Items.RUSTY_KEY);
            player.inventory.push(Items.DAGGER);
            return true;
        }
        return false;
    },
};

const MountainHappenings = {};

const WaterHappenings = {};

module.exports = {
    PlainHappenings,
    MountainHappenings,
    WaterHappenings,
};
