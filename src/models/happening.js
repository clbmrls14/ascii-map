const { Actions } = require("../enums/actions");

class Happening {
    isCompleted = false;
    title;
    method;
    combatStatus;

    constructor(title, method, combatStatus) {
        this.title = title;
        this.method = method;
        this.combatStatus = this.combatStatus;
    }

    handleHappening = (player, action = Actions.DEFAULT) => {
        if (!this.isCompleted) {
            const result = this.method(player, action, this.combatStatus);
            this.isCompleted = result.isCompleted;
            player.isBusy = result.actions.length;
            if (result.combatStatus !== undefined) {
                this.combatStatus = result.combatStatus;
            }
        }
    };
}

module.exports = { Happening };
