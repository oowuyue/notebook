function Food(game) {
    this.game = game;
    this.x;
    this.y;
    this.foodScore = 3;
}

Food.prototype.random = function () {
    this.x = Math.floor((Math.random() * 30) + 1);
    this.y = Math.floor((Math.random() * 30) + 1);
    return this;
}

Food.prototype.setxy = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
}