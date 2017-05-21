// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // initial position: x, y
    var x = -100;
    var y = 0;

    // screen width
    this.ScreenWidth = 505;
    //  factor of bug's speed
    this.factor = 100;
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
    if(this.x < this.ScreenWidth){
        this.x += dt * this.factor;
    }
    else {
        this.x = -100;
    }
    // this.y = 60;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // horizontal pixels of every box is 100
    this.OneStepHpixel = 100;
    this.x = 200;
    // vertical pixels of every box is 85
    this.OneStepVPiexl = 85;
    // initial value is 70
    this.y = 410;
    // screen width
    this.ScreenWidth = 505;
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {

};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyCode) {
    switch(keyCode){
        case 'left': this.x = this.x - this.OneStepHpixel; break;
        case 'right': this.x = this.x + this.OneStepHpixel; break;
        case 'up': this.y = this.y - this.OneStepVPiexl; break;
        case 'down': this.y = this.y + this.OneStepVPiexl; break;
        default: break;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    else if (this.x > 400) {
        this.x = 400;
    }
    if (this.y < 0){
        this.y = 0;
    }
    else if( this.y > 415){
        this.y = 415;
    }
    console.log('x = '+ this.x + '; y = ' + this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var numOfEnemies = 3;
for(var i = 0; i < numOfEnemies; i++){
  allEnemies.push(new Enemy());
allEnemies[i].y = (i + 1) * 70;
  // console.log(allEnemies[i].y);
}
var player = new Player();

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
