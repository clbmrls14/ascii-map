const { Actions } = require("../enums/actions");

class Happening {
    isCompleted = false;
    title;
    method;

    constructor(title, method) {
        this.title = title;
        this.method = method;
    }

    handleHappening = (player, action = Actions.DEFAULT) => {
        if (!this.isCompleted) {
            const result = this.method(player, action);
            this.isCompleted = result.isCompleted;
            player.isBusy = result.actions.length;
        }
    };
}

module.exports = { Happening };
