function Snake(game) {
    this.game = game;

    this.snakeBody = [];
    this.snakeSize = 10; //draw 时用 高度尺寸
    this.direction = "down";

    this.initSnake();
}

Snake.prototype.initSnake = function () {
    var length = 4;
    for (var i = length - 1; i >= 0; i--) {
        this.snakeBody.push(new Food(this.game).setxy(i, 0));
    }
    /***
     *   2      1       0
     * ----------------------
     *   1,0    2,0    3,0   |  <—— unshift
     * ----------------------
     * ——>push 
     * <——pop
     */
};

Snake.prototype.run = function () {
    console.log("run");
    var snakeX = this.snakeBody[0].x;
    var snakeY = this.snakeBody[0].y;
    if (this.direction == 'right') {
        snakeX++;
    } else if (this.direction == 'left') {
        snakeX--;
    } else if (this.direction == 'up') {
        snakeY--;
    } else if (this.direction == 'down') {
        snakeY++;
    }

    if (this.checkCollision(snakeX, snakeY)) {
        this.game.end();
        return;
    }

    var curFood = this.game.food;
    if (snakeX == curFood.x && snakeY == curFood.y) {
        var tail = new Food(this.game).setxy(snakeX, snakeY);
        this.game.snakeEat(tail);
        this.game.createFood();
    } else {
        var tail = this.snakeBody.pop();
        tail.x = snakeX;
        tail.y = snakeY;
    }
    this.snakeBody.unshift(tail);

    this.game.draw();
};

Snake.prototype.checkCollision = function (snakeX, snakeY) {

    if (snakeX == -1 ||
        snakeX == this.game.w / this.snakeSize ||
        snakeY == -1 ||
        snakeY == this.game.h / this.snakeSize) {
        return true;
    }
    for (var i = 0; i < this.snakeBody.length; i++) {
        if (this.snakeBody[i].x === snakeX && this.snakeBody[i].y === snakeY)
            return true;
    }
    return false;
}