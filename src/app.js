// Game interaction layer

const game = new Game();


/**
 * Listens for click on `#begin-two-player` and calls startGame() on game object
 */
 document.getElementById('begin-game').addEventListener('click', function(e) {
     document.getElementById('begin-game').style.display = 'none';
     document.getElementById('play-area').style.opacity = '1';
     game.startGame();
 });


/**
 * Listens for keypress and triggers the correct method
 */
document.addEventListener('keydown', function(e) {
    game.handleKeydown(e);
});
