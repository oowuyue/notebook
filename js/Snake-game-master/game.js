function Game() {
    this.ctx = document.getElementById('mycanvas').getContext('2d');
    this.w = 350;
    this.h = 350;

    this.snake;
    this.food;

    this.gameloop;
    this.btn;

    this.regEvent();
}


Game.prototype.start = function () {

    this.food = new Food(0, 0, this).random();
    this.snake = new Snake(this);
    this.btn.setAttribute('disabled', true);
    var self = this;
    this.gameloop = setInterval(() => self.snake.run(), 100);
}

Game.prototype.createFood = function () {
    this.food = new Food(0, 0, this).random();
}

Game.prototype.end = function () {
    this.btn.removeAttribute('disabled', true);
    this.ctx.clearRect(0, 0, this.w, this.h);

    this.gameloop = clearInterval(this.gameloop);
    return;
}

Game.prototype.regEvent = function () {
    this.btn = document.getElementById('btn');
    this.btn.addEventListener("click", function () {
        this.start();
    }.bind(this));

    document.onkeydown = function (event) {
        keyCode = window.event.keyCode;
        keyCode = event.keyCode;
        switch (keyCode) {
            case 37:
                if (this.snake.direction != 'right') {
                    this.snake.direction = 'left';
                }
                console.log('left');
                break;

            case 39:
                if (this.snake.direction != 'left') {
                    this.snake.direction = 'right';
                    console.log('right');
                }
                break;

            case 38:
                if (this.snake.direction != 'down') {
                    this.snake.direction = 'up';
                    console.log('up');
                }
                break;

            case 40:
                if (this.snake.direction != 'up') {
                    this.snake.direction = 'down';
                    console.log('down');
                }
                break;
            default:{
                
            }
        }
    }.bind(this);
};


Game.prototype.draw = function () {

    //draw canvs
    this.ctx.fillStyle = 'lightgrey';
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(0, 0, this.w, this.h);

    //draw snake
    for (var i = 0; i < this.snake.snakeBody.length; i++) {
        var x = this.snake.snakeBody[i].x;
        var y = this.snake.snakeBody[i].y;
        var snakeSize = this.snake.snakeSize;
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        this.ctx.strokeStyle = 'darkgreen';
        this.ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    //draw food
    var x = this.food.x;
    var y = this.food.y;
    var snakeSize = this.snake.snakeSize;
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
}