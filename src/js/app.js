// Game interaction layer

const game = new Game();


/**
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
document.getElementById('begin-game').addEventListener('click', function(e) {
    this.style.display = "none";
    document.getElementById('play-area').style.opacity = '1';
    game.startGame();
});
