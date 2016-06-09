// Create the canvas
// x and y sets the original position. dx, dy are little increments for movement of each frame when the frame/game updates
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')
canvas.width = 560
canvas.height = 520
canvas.fillStyle = 'black'
canvas.style = 'position:absolute; left: 45%; width: 560px; margin-left: -200px; margin-top: 50px'
document.body.appendChild(canvas)
// Position variables
var x = canvas.width / 2
var y = canvas.height - 60
var ballRadius = 10
var x2 = canvas.width / 2
var y2 = canvas.height - 60
var dx = 5
var dy = -5
var dx2 = 4
var dy2 = -4
// Paddle variables
var paddleHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width - paddleWidth) / 2
var rightPressed = false
var leftPressed = false
// Brick variables
var brickRowCount = 5
var brickColumnCount = 6
var brickWidth = 75
var brickHeight = 16
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30
var bricks = []
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }
  }
}
// Player status variables
var score = 0
var lives = 4
// For paddle movement. Events to listen to the keyboard.
document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler (e) {
  if (e.keyCode === 13) {
    draw()
  }
  if (e.keyCode === 81) {
    document.location.reload()
  }
  if (e.keyCode === 39) {
    rightPressed = true
  }
  else if (e.keyCode === 37) {
    leftPressed = true
  }
}
function keyUpHandler (e) {
  if (e.keyCode === 39) {
    rightPressed = false
  }
  else if (e.keyCode === 37) {
    leftPressed = false
  }
}

function start () {
  drawBricks()
  drawScore()
  drawPaddle()
  drawLives()
  startText()
}
start()
// clearRect() method take four parameters: the x and y coordinates of the top left corner of a rectangle, and the x and y coordinates of the bottom right corner of a rectangle.
// Each brickX position is worked out as brickWidth + brickPadding, multiplied by the row number, c, plus the brickOffsetLeft; the logic for the brickY uses the values for column number, r, brickHeight, and brickOffsetTop. So every brick can be placed in its correct place row and column, with padding between each brick, drawn at an offset from the left and top canvas edges.
function drawBall () {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI)
  ctx.Stroke = '10'
  ctx.fillStyle = '#FF1493'
  ctx.fillStroke = '#FF1493'
  ctx.fill()
  ctx.closePath()
}

function drawBall2 () {
  ctx.beginPath()
  ctx.arc(x2, y2, ballRadius, 0, 2 * Math.PI)
  ctx.Stroke = '10'
  ctx.fillStyle = '#FF1493'
  ctx.fillStroke = '#FF1493'
  ctx.fill()
  ctx.closePath()
}

function drawPaddle () {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = '#F5F5F5'
  ctx.closePath()
  ctx.fill()
}

function drawBricks () {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.fillStyle = '#00FFFF'
        ctx.fillRect(brickX, brickY, brickWidth, brickHeight)
        ctx.closePath()
        ctx.fill()
      }
    }
  }
}
// Center of the ball inside the coordinates of any bricks will change the direction of the ball
// x position of the ball greater than the x position of the brick
// x position of the ball less than the x position of the brick plus its width
// y position of the ball greater than the y position of the brick
// y position of the ball is less than the y position of the brick plus its height
// need to have brick disappear when hit
function collisionDetection () {
  for (c = 0; c < brickColumnCount; c++) {
    for(r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy
          b.status = 0
          score++
        }
        if (score === brickRowCount * brickColumnCount) {
          winner()
          resetText()
          cancelAnimationFrame(frame)
        }
      }
    }
  }
}

function collisionDetection2 () {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status === 1) {
        if (x2 > b.x && x2 < b.x + brickWidth && y2 > b.y && y2 < b.y + brickHeight) {
          dy2 = -dy2
          b.status = 0
          score++
        }
        if (score === brickRowCount * brickColumnCount) {
          winner()
          resetText()
          cancelAnimationFrame(frame)
        }
      }
    }
  }
}

function startText () {
  ctx.font = '18px Futura'
  ctx.fillStyle = '#F5F5F5'
  ctx.fillText('Left and Right keys to move paddle. Enter to start.', 60, 300)
}

function drawScore () {
  ctx.font = '18px Futura'
  ctx.fillStyle = '#F5F5F5'
  ctx.fillText('Score: ' + score, 8, 20)
}

function drawLives () {
  ctx.font = '18px Futura'
  ctx.fillStyle ='#F5F5F5'
  ctx.fillText('Lives: ' + lives, 480, 20)
  }

function winner () {
  ctx.font = '65px Futura'
  ctx.fillStyle = '#FF1493'
  ctx.fillText('Winner!', 180, 300)
}

function gameOver () {
  ctx.font = '65px Futura'
  ctx.fillStyle = '#F5F5F5'
  ctx.fillText('Game Over!', 80, 300)
}

function resetText () {
  ctx.font = '20px Futura'
  ctx.fillStyle = '#00FFF'
  ctx.fillText('Press Q to restart.', 190, 400)
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawBall2()
  drawPaddle()
  drawScore()
  drawLives()
  drawBricks()
  collisionDetection2()
  if (x2 + dx2 > canvas.width - ballRadius || x2 + dx2 < ballRadius) {
    dx2 = -dx2
  }
  if (y2 + dy2 < ballRadius) {
    dy2 = -dy2
  }
  else if (y2 + dy2 > canvas.height - ballRadius) {
    if (x2 > paddleX && x2 < paddleX + paddleWidth) {
      if (y2 = y2 - paddleHeight) {
     dy2 = -dy2
      }
    }
  else {
    lives--
    if(!lives) {
      drawLives() - 1
      gameOver()
      resetText()
      cancelAnimationFrame(frame)
    } else {
      x2 = canvas.width / 2
      y2 = canvas.height - 160
      dx2 = 3
      dy2 = -3
    }
    }
  }
  collisionDetection()
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
  }
  if (y + dy < ballRadius) {
    dy = -dy
  }
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
        if (y = y - paddleHeight) {
          dy = -dy
        }
    }
  else {
      lives--
      if(!lives) {
        drawLives() - 1
        gameOver()
        resetText()
        cancelAnimationFrame(frame)
      }
      else {
        x = canvas.width / 2
        y = canvas.height - 160
        dx = 4
        dy = -4
      }
    }
  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7
  }
  else if (leftPressed && paddleX > 0 ) {
    paddleX -= 7
  }

  x = x + dx
  y = y + dy

  x2 = x2 + dx2
  y2 = y2 + dy2
  requestAnimationFrame(draw)
}

