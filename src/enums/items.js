const { Item } = require("../models/items");

const Items = {
    RUSTY_KEY: Item("Rusty Key", "A key that opens a rusty door", false, 0),
};

module.exports = { Items };
