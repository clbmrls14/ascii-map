class Happening {
  isCompleted = false;
  title;
  method;

  constructor(title, method) {
    this.title = title;
    this.method = method;
  }

  handleHappening = (player) => {
    if (!this.isCompleted) {
      this.isCompleted = this.method(player);
    }
  };
}

module.exports = { Happening };
