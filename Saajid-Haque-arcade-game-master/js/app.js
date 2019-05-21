//random numbers for y location and speed of enemies
let yRandom = function(){
  return Math.floor((Math.random() * 150) + 50);
}

let speedRandom = function(){
  return Math.floor((Math.random() * 75 + 100))
}

//variable for score
let score = 0;

//getting scoreboard info
let scoreBoard = document.querySelector('.score');

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //enemies back to beginning
    this.x = this.x + this.speed * dt;
    if (this.x >= 505){
      this.x = 0;
      this.y = yRandom();
    }

    //check for collision
    //used the following blog for ideas behind the collision
    //http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/#d-collision-detection
    if (player.y + 130 >= this.y + 90 && player.y + 75 <= this.y + 135 &&
        player.x + 25 <= this.x + 90 && player.x + 75 >= this.x + 10) {
        player.reset();
        score = 0;
        scoreBoard.innerHTML = "Score: " + score;
}

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our players, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

//reset player when reaching water
Player.prototype.reset = function(){
  this.x = 205;
  this.y = 400;
}

// Update method for Player
// Keeping player within boundaries
Player.prototype.update = function(){
  if (this.x < 5){
    this.x = 5;
  }
  if (this.x > 400){
    this.x = 400;
  }
  //if player reaches water without being hit then increase score and reset player
  if (this.y <= -25){
    player.reset();
    score += 1;
    scoreBoard.innerHTML = "Score: " + score;
  }
  if (this.y >= 400){
    this.y = 400;
  }
};

//guess and check with the numbers
//still not sure best way to handle this
Player.prototype.handleInput = function(arrow) {
  if (arrow == 'right') {
      this.x += 100;
  }

  if (arrow == 'left') {
      this.x -= 100;
  }

  if (arrow == 'up') {
      this.y -= 85;
  }

  if(arrow == 'down') {
      this.y += 85;
  }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//initializing enemies
var allEnemies = [];
allEnemies.push(new Enemy(0,yRandom(),speedRandom()));
allEnemies.push(new Enemy(0,yRandom(),speedRandom()));
allEnemies.push(new Enemy(0,yRandom(),speedRandom()));

//initialize player
var player = new Player(205,400,100);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
