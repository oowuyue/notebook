function Food(x, y, game) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.score = 1;
    this.game;
}

Food.prototype.random = function () {
    this.x = Math.floor((Math.random() * 30) + 1);
    this.y = Math.floor((Math.random() * 30) + 1);
    return this;
}