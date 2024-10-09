export default class Enemy {
    //constructor for enemies
    constructor(x, y, imageNumber) {
      this.x = x;
      this.y = y;
      this.width = 44;
      this.height = 32;
  
      //create enemy Image Object
      this.image = new Image();
      this.image.src = `images/enemy${imageNumber}.png`;
    }
  
    //display enemy Object to the screen
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  
    //move function for enemy movement
    move(xVelocity, yVelocity) {
      this.x += xVelocity;
      this.y += yVelocity;
    }
  
    //create function that ensures enemies move in unison and do NOT overlap each other
    collideWith(sprite) {
      if (
        this.x + this.width > sprite.x &&
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
      ) {
        return true;
      } else {
        return false;
      }
    }
  }