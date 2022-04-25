const { Items } = require("./items");

const PlainHappenings = {
    FIND_RUSTY_KEY: (player) => {
        if (!player.inventory.includes(Items.RUSTY_KEY)) {
            player.inventory.push(Items.RUSTY_KEY);
        }
        return true;
    },
};

const MountainHappenings = {};

const WaterHappenings = {};

module.exports = {
    PlainHappenings,
    MountainHappenings,
    WaterHappenings,
};
