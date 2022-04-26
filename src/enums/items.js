const { Item } = require("../models/items");

const Items = {
    BOTTLE_OF_ALE: new Item(
        "Bottle of Ale",
        "A bottle of northern ale",
        false,
        0,
        3
    ),
    DAGGER: new Item("Dagger", "A short dagger of iron", true, 4, 10),
    FISHING_ROD: new Item(
        "Fishing Rod",
        "A cheap rod used for catching fish",
        false,
        0,
        2
    ),
    RUSTY_KEY: new Item(
        "Rusty Key",
        "A key that opens a rusty door",
        false,
        0,
        1
    ),
    SHORT_SWORD: new Item("Short Sword", "A short sword of iron", true, 6, 15),
    SPEAR: new Item("Spear", "A simple spear with an iron tip", true, 6, 12),
    WEDDING_BAND: new Item(
        "Wedding Band",
        "A silver ring symbolizing a marital oath",
        false,
        0,
        30
    ),
};

module.exports = { Items };
