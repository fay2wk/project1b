// Create the canvas
// x and y sets the original position. dx, dy are little increments for movement of each frame when the frame/game updates
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 560;
canvas.height = 520;
canvas.fillStyle = 'black';
document.body.appendChild(canvas);
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 6;
var brickWidth = 75;
var brickHeight = 16;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// For paddle movement. Even to listen to the keyboard.
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

// draws the ball. preferably us requestAnimationFrame over setInterval. Read up arc () method
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

function drawPaddle () {
	ctx.beginPath()
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
	ctx.fillstyle = '#0095DD'
	ctx.fill()
	ctx.closePath()
	}
function drawBricks () {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop
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
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy
                    b.status = 0
                    score++
                    if(score == brickRowCount * brickColumnCount) {
                        alert ('Winner!')
                        document.location.reload()
                    }
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

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
  drawScore();
	collisionDetection();
 if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
			 if(y= y-paddleHeight){
            dy = -dy  ;
			 }
        }
        // else {
        //     alert("Game over! Noob!");
        //     document.location.reload();
        // }
    }
	if(rightPressed && paddleX<canvas.width-paddleWidth){

		paddleX+=7;
		}
	 else if(leftPressed && paddleX>0 ){
		 paddleX-=7;

		 }

		 x = x + dx;
	   y = y + dy;
	}

setInterval(draw,10);
