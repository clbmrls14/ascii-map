const { Item } = require("../models/items");

const Items = {
    DAGGER: new Item("Dagger", "A short dagger of iron", true, 4, 10),
    RUSTY_KEY: new Item(
        "Rusty Key",
        "A key that opens a rusty door",
        false,
        0,
        1
    ),
};

module.exports = { Items };
