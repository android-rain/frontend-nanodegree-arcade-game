var rl = document.getElementById("result");
var isCollided = false;
var isWon = false;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // initial position: x, y
    var x = -100;
    var y = 0;

    // screen width
    this.ScreenWidth = 505;
    //  inital factor of bug's speed
    this.factor = 30;
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
    if (this.x < this.ScreenWidth) {
        this.x += dt * this.factor;
    }
    //reset the bug's position and speed after it run over out of the canvas
    else {
        this.x = -101;
        row = (Math.random() * 10 / 5).toFixed();
        this.y = 83 + row * 83;
        this.factor = 100 * (Math.random() * 3 + 1).toFixed();
    }
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
    this.OneStepHpixel = 101;
    this.x = 101 * 3;
    // vertical pixels of every box is 85
    this.OneStepVPiexl = 83;
    // initial value is 70
    this.y = 83 * 4;
    // screen width
    this.ScreenWidth = 505;
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {
    if (!isCollided) {
        isCollided = checkCollisions();
    }
    if (!isWon) {
        isWon = checkPlayerWin();
    }
    check();
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyCode) {
    // if collied or won, the up,right,down,left keys would not be used,and
    // waitting for user push down the enter key
    if (isCollided || isWon) {
        if (keyCode === 'enter') {
            resetPlayer();
        }
    } else {
        switch (keyCode) {
            case 'left':
                this.x = this.x - this.OneStepHpixel;
                break;
            case 'right':
                this.x = this.x + this.OneStepHpixel;
                break;
            case 'up':
                this.y = this.y - this.OneStepVPiexl;
                break;
            case 'down':
                this.y = this.y + this.OneStepVPiexl;
                break;
            default:
                break;
        }
    }
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    }
    if (this.y < 0) {
        this.y = 0;
    } else if (this.y > 415) {
        this.y = 415;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var numOfEnemies = 5;
for (var i = 0; i < numOfEnemies; i++) {
    allEnemies.push(new Enemy());

    row = (Math.random() * 10 / 5).toFixed();
    allEnemies[i].y = 83 + row * 83;

    allEnemies[i].factor *= (Math.random() * 10).toFixed();
}
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* This function is to detect the collisions of the enemy with player.
 * method: check the both entities whether or not coincide.
 */
function checkCollisions() {
    var positions = [];
    allEnemies.forEach(function(enemy) {
        positions.push([enemy.x, enemy.y]);
    });
    var px = player.x;
    var py = player.y;
    for (var i = 0; i < positions.length; i++) {
        if (Math.abs(positions[i][0] - px) < 70 && Math.abs(positions[i][1] - py) < 80) {
            return true;
        }
    }
    return false;
}

/* This function is to detect the player could be win.
 */
function checkPlayerWin() {
    // detect if the player is into the river
    if (player.y < 83) {
        return true;
    }
    return false;
}

// This function is to display web text of the game result
function check() {
    if (isCollided || isWon) {
        isWon ? rl.innerHTML = "You win" : rl.innerHTML = "You die";
    }
}

// This function is to reset the player's position , web text and flags
function resetPlayer() {

    player.x = 101 * 2;
    player.y = 83 * 4;
    rl.innerHTML = "Playing";
    isWon ? isWon = false : isCollided = false;

}
