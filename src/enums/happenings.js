const PlainHappenings = {
    FIND_CROWN: (player) => {
        if (!player.inventory.includes(Items.CROWN)) {
            player.inventory.push(Items.CROWN);
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
