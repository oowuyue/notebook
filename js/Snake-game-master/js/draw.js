var drawModule = (function () {

  var drawCanvas = function () {
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);
  }
  var drawSnake = function () {
    for (var i = 0; i < snake.length; i++) {
      var x = snake[i].x;
      var y = snake[i].y;
      ctx.fillStyle = 'green';
      ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
      ctx.strokeStyle = 'darkgreen';
      ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }
  }
  var drawFood = function () {
    var x = food.x;
    var y = food.y;
    ctx.fillStyle = 'red';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    
  }
  var drawScore = function () {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, h - 5);
  }

  /*********************** */

  var run = function () {

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    if (direction == 'right') {
      snakeX++;
    } else if (direction == 'left') {
      snakeX--;
    } else if (direction == 'up') {
      snakeY--;
    } else if (direction == 'down') {
      snakeY++;
    }

    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
      btn.removeAttribute('disabled', true);
      ctx.clearRect(0, 0, w, h);
      drawCanvas();
      gameloop = clearInterval(gameloop);
      return;
    }

    if (snakeX == food.x && snakeY == food.y) {
      var tail = {
        x: snakeX,
        y: snakeY
      };
      score++;
      createFood();
    } else {
      var tail = snake.pop();
      tail.x = snakeX;
      tail.y = snakeY;
    }
    snake.unshift(tail);

    drawCanvas();
    drawSnake();
    drawFood();
    drawScore();
  }

  var initSnake = function () {
    var length = 4;
    snake = [];
    for (var i = length - 1; i >= 0; i--) {
      snake.push({
        x: i,
        y: 0
      });
    }
  }

  var createFood = function () {
    food = {
      x: Math.floor((Math.random() * 30) + 1),
      y: Math.floor((Math.random() * 30) + 1)
    }

    for (var i = 0; i > snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;
      if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
        food.x = Math.floor((Math.random() * 30) + 1);
        food.y = Math.floor((Math.random() * 30) + 1);
      }
    } //for
  }

  var init = function () {
    btn.setAttribute('disabled', true);
    direction = 'down';
    initSnake();
    createFood();
    gameloop = setInterval(run, 100);
  }

  var checkCollision = function (x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y)
        return true;
    }
    return false;
  }

  drawCanvas();
  return {
    init: init
  };

}());