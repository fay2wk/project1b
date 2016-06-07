// Create the canvas
// x and y sets the original position. dx, dy are little increments for movement of each frame when the frame/game updates
var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')
canvas.width = 560
canvas.height = 520
canvas.fillStyle = 'black'
canvas.style = 'position:absolute; left: 45%; width: 560px; margin-left: -200px; margin-top: 50px';
document.body.appendChild(canvas)
var isPaused = false
var x = canvas.width/2
var y = canvas.height-30
var ballRadius = 10
var x2 = canvas.width/3
var y2 = canvas.height-20
var dx = 2
var dy = -2
var dx2 = 1
var dy2 = -1
var paddleHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width-paddleWidth)/2
var rightPressed = false
var leftPressed = false
var brickRowCount = 5
var brickColumnCount = 6
var brickWidth = 75
var brickHeight = 16
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30
var score = 0
var lives = 3

var bricks = []
for(c = 0; c < brickColumnCount; c++) {
    bricks[c] = []
    for(r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 }
    }
}

// For paddle movement. Even to listen to the keyboard.
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true
    }
    else if (e.keyCode == 37) {
      leftPressed = true
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
      rightPressed = false
    }
    else if(e.keyCode == 37) {
      leftPressed = false
    }
}

$('.start').click(function() {
  if (!draw ()) {
  return draw ()
  } else {
    return
}
})

$('.pause').click(function() {
  return cancelAnimationFrame (draw)
})
// clearRect() method take four parameters: the x and y coordinates of the top left corner of a rectangle, and the x and y coordinates of the bottom right corner of a rectangle.
// Each brickX position is worked out as brickWidth + brickPadding, multiplied by the row number, c, plus the brickOffsetLeft; the logic for the brickY uses the values for column number, r, brickHeight, and brickOffsetTop. So every brick can be placed in its correct place row and column, with padding between each brick, drawn at an offset from the left and top canvas edges.
function drawBall () {
	ctx.beginPath()
	ctx.arc(x, y, ballRadius, 0, 2 * Math.PI)
	ctx.fillstyle = '#00FFFF'
	ctx.fillStroke = '#00FFFF'
	ctx.Stroke = '10'
	ctx.fill()
	ctx.closePath()
	}

function drawBall2 () {
	  ctx.beginPath()
  	ctx.arc(x2, y2, ballRadius, 0, 2 * Math.PI)
  	ctx.fillstyle = '#FF00FF'
  	ctx.fillStroke = '#FF00FF'
  	ctx.Stroke = '10'
  	ctx.fill()
  	ctx.closePath()
}

function drawPaddle () {
	ctx.beginPath()
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
	ctx.fillstyle = '#0095DD'
	ctx.fill()
	ctx.closePath()
}
function drawBricks () {
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeight)
                ctx.fillStyle = '#00FFFF'
                ctx.fill()
                ctx.closePath()
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
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {
          var b = bricks[c][r];
          if(b.status === 1) {
              if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy
                    b.status = 0
                    score++
                }
                  if(score === brickRowCount * brickColumnCount) {
                        alert('Winner!')
                        document.location.reload()
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
              alert('Winner! Play again?')
              document.location.reload()
                // restart()
            }
          }
        }
    }
}

function drawScore () {
  ctx.font = '18px Futura'
  ctx.fillStyle = '#F0F8FF'
  ctx.fillText('Score: ' + score, 8, 20)
}

function gamePause () {

}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawBall()
  drawBall2()
  drawPaddle()
  drawScore()
  collisionDetection2()
  if (x2 + dx2 > canvas.width - ballRadius || x2 + dx2 < ballRadius) {
    dx2 = -dx2
}
  if (y2 + dy2 < ballRadius) {
    dy2 = -dy2
  }
  else if(y2 + dy2 > canvas.height - ballRadius) {
    if (x2 > paddleX && x2 < paddleX + paddleWidth) {
      if (y2 = y2 - paddleHeight) {
     dy2 = -dy2
   }
    }
  }
	collisionDetection()
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
  }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
			 if(y= y - paddleHeight){
            dy = -dy  ;
			 }
        }
  // else {
  // alert('Game over! Noob!');
  // document.location.reload();
  //  }
    }
	if(rightPressed && paddleX < canvas.width - paddleWidth){

		paddleX+=7;
		}
	 else if(leftPressed && paddleX>0 ){
		 paddleX-=7;

		 }

		 x = x + dx
	   y = y + dy

     x2 = x2 + dx2;
	   y2 = y2 + dy2;
     requestAnimationFrame(draw)
	}

// draw()


// restart()
// pause () { use cancelAnimationFrame

//}
