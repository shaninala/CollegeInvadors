import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

//create canvas (connect js class to html canvas)
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//set bounds
canvas.width = 600;
canvas.height = 600;

//set background
const background = new Image();
background.src = "images/space.png";


/*IMPORTANT:
*create bullet controller for enemies (white color)
*create bullet controller for player (red color)
*create PLAYER Object
*create enemy controller 
*/
const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

//game loop
//ensure that all images and controllers are constantly displayed to the screen so long 
function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}
// function to display when the game is over 
function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win" : "Game Over"; //displays appropriate message 
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2); //ensures the display message is somewhat in the middle of the screen
  }
}
 
//function to determine a game over
function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) { //if an enemy bullet collides with the player at any time, intiate a game over
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) { //if an enemy itself collides with the player at any time, intiate a game over
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) { //if 
    didWin = true;
    isGameOver = true;
  }
}

// allows the game to run 60 times every second
setInterval(game, 1000 / 60);