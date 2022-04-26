const { Actions } = require("./actions");
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
        player.inventory.push(Items.RUSTY_KEY);
        return {
            message: "You find a rusty key, maybe it will open something.",
            actions: [],
            isCompleted: true,
        };
    },
    GOBLIN: (player, action, combatStatus) => {
        switch (action) {
            case Actions.DEFAULT:
                return {
                    message: "You stumble onto an angry goblin!",
                    actions: [Actions.ATTACK, Actions.FLEE],
                    isCompleted: false,
                    combatStatus: { enemyHealth: 4 },
                };
            case Actions.ATTACK:
                const damage = player.attack();
                combatStatus.enemyHealth -= damage;
                if (combatStatus.enemyHealth < 1) {
                    const earnings = Math.floor(Math.random() * 4) + 2;
                    player.coins += earnings;
                    return {
                        message: `You strike with your ${player.weapon} for ${damage} damage, 
                        slaying the goblin! You find ${earnings} 
                        gold on the corpse.`,
                        actions: [],
                        isCompleted: true,
                    };
                }
                return {
                    message: `You strike with your ${player.weapon} for ${damage} damage!`,
                    actions: [Actions.ATTACK, Actions.FLEE],
                    isCompleted: false,
                    combatStatus: combatStatus,
                };
            case Actions.FLEE:
                if (Math.random() < 0.5) {
                    return {
                        message: "You manage to escape!",
                        actions: [],
                        isCompleted: false,
                    };
                } else {
                    return {
                        message: "You are unable to escape!",
                        actions: [Actions.ATTACK, Actions.FLEE],
                        isCompleted: false,
                        combatStatus: combatStatus,
                    };
                }
        }
    },
    RUSTY_DOOR: (player, action) => {
        const hasItem = player.inventory.includes(Items.RUSTY_KEY);
        if (action === Actions.DEFAULT) {
            return {
                message: hasItem
                    ? "There is a rusty door here. It might open with a key. Open the door?"
                    : "There is a rusty door here. It might open with a key.",
                actions: hasItem ? [Actions.YES, Actions.NO] : [],
                isCompleted: false,
            };
        }
        if (hasItem) {
            if (action === Actions.YES) {
                player.inventory = removeItem(
                    player.inventory,
                    Items.RUSTY_KEY
                );
                player.inventory.push(Items.DAGGER);
                return {
                    message:
                        "You open the door to find a corpse draped over an open chest. Someone else got the treasure, but you take the dagger in their back.",
                    actions: [],
                    isCompleted: true,
                };
            } else {
                return {
                    message: "You save the key for later.",
                    actions: [],
                    isCompleted: false,
                };
            }
        }
    },
};

const MountainHappenings = {};

const WaterHappenings = {};

module.exports = {
    PlainHappenings,
    MountainHappenings,
    WaterHappenings,
};
