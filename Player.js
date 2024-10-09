// Define a class called Player
export default class Player {
    // Initialize variables to track key presses
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;
  
    // Constructor to initialize the player object
    constructor(canvas, velocity, bulletController) {
      // Store canvas, velocity, and bulletController parameters
      this.canvas = canvas;
      this.velocity = velocity;
      this.bulletController = bulletController;
  
      // Set initial position of the player
      this.x = this.canvas.width / 2;
      this.y = this.canvas.height - 75;
      this.width = 50;
      this.height = 48;
      this.image = new Image();
      this.image.src = "images/player.png";
  
      // Add event listeners for keydown and keyup events
      document.addEventListener("keydown", this.keydown);
      document.addEventListener("keyup", this.keyup);
    }
  
    // Method to draw the player on the canvas
    draw(ctx) {
      // If shoot key is pressed, shoot a bullet
      if (this.shootPressed) {
        this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
      }
      // Move the player
      this.move();
      // Check for collisions with walls
      this.collideWithWalls();
      // Draw the player image on the canvas
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    // Method to handle collisions with walls
    collideWithWalls() {
      // Prevent player from going out of the left boundary
      if (this.x < 0) {
        this.x = 0;
      }
  
      // Prevent player from going out of the right boundary
      if (this.x > this.canvas.width - this.width) {
        this.x = this.canvas.width - this.width;
      }
    }
  
    // Method to move the player based on key presses
    move() {
      if (this.rightPressed) {
        // Move player to the right
        this.x += this.velocity;
      } else if (this.leftPressed) {
        // Move player to the left
        this.x += -this.velocity;
      }
    }
  
    // Event handler for keydown events
    keydown = (event) => {
      // Check if right arrow key is pressed
      if (event.code == "ArrowRight") {
        this.rightPressed = true;
      }
      // Check if left arrow key is pressed
      if (event.code == "ArrowLeft") {
        this.leftPressed = true;
      }
      // Check if spacebar key is pressed
      if (event.code == "Space") {
        this.shootPressed = true;
      }
    };
  
    // Event handler for keyup events
    keyup = (event) => {
      // Check if right arrow key is released
      if (event.code == "ArrowRight") {
        this.rightPressed = false;
      }
      // Check if left arrow key is released
      if (event.code == "ArrowLeft") {
        this.leftPressed = false;
      }
      // Check if spacebar key is released
      if (event.code == "Space") {
        this.shootPressed = false;
      }
    };
  }