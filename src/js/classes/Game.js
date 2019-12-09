class Game
{

    constructor()
    {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }


    /**
     * Generates an array of player objects
     * @return {Array}
    */
    createPlayers()
    {
        return [
            new Player('Player 1', 1, '#e15258', true),
            new Player('Player 2', 2, '#e59a13')
        ];
    }


    /**
    * @return Player object where active property is true
    */
    get activePlayer()
    {
        return this.players.find(player => player.active);
    }


    /**
     * Move token right, left or drop
     * @param {Object} e - Keydown event
     */
    handleKeydown(e)
    {
        if (this.ready) {
            if (e.key === 'ArrowLeft') {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === 'ArrowRight') {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if (e.key === 'ArrowDown') {
                this.playToken();
            }
        }
    }


    /**
     * Determine if current column location of active player's active token is full
     * If not full, determines target space and calls active token's drop() method
     */
    playToken()
    {
        const activeToken = this.activePlayer.activeToken;
        const tokenColumnLocation = activeToken.columnLocation;
        const column = this.board.spaces[tokenColumnLocation];
        const self = this;
        if (column[0].token !== null) {
            return;
        } else {
            for (let i = 5; i >= 0; i--) {
                if (column[i].token === null) {
                    this.ready = false;
                    activeToken.drop(column[i], function() {
                        self.updateGameState(activeToken, column[i]);
                    });
                    break;
                }
            }
        }
    }


    /**
     * Updates game state after token is dropped
     * @param   {Object}  token  -  The token that's being dropped
     * @param   {Object}  target -  Targeted space for dropped token
     */
    updateGameState(token, target)
    {
        target.mark(token);
        if (this.checkForWin(target)) {
            this.gameOver(`${this.activePlayer.name} wins!`);
            this.ready = false;
            return;
        } else {
            this.switchPlayers();
        }
        if (this.activePlayer.checkTokens()) {
            this.activePlayer.activeToken.drawHTMLToken();
            this.ready = true;
        } else {
            this.gameOver(`${this.activePlayer.name} has no more tokens. Game over!`);
        }
    }


    /**
     * Switch active player
     */
    switchPlayers()
    {
        this.players.forEach(player => player.active = !player.active);
    }


    /**
     * Initializes gameplay
     */
    startGame()
    {
        this.ready = true;
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
    }


    /**
     * Display game over message
     * @param {string} message - game over message
     */
    gameOver(message)
    {
        const gameover = document.getElementById('game-over');
        gameover.style.display = 'block';
        gameover.textContent = message;

    }


    /**
     * Checks if there a winner on the board after each token drop.
     * @param   {Object}    Targeted space for dropped token.
     * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
     */
    checkForWin(target)
    {
        const owner = target.token.owner;
        let win = false;
        // vertical
        for (let x = 0; x < this.board.columns; x++) {
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x][y+1].owner === owner &&
                    this.board.spaces[x][y+2].owner === owner &&
                    this.board.spaces[x][y+3].owner === owner) {
                        win = true;
                }
            }
        }
        // horizontal
        for (let x = 0; x < this.board.columns - 3; x++) {
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x+1][y].owner === owner &&
                    this.board.spaces[x+2][y].owner === owner &&
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }
            }
        }
        // diagonal
        for (let x = 3; x < this.board.columns; x++) {
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x-1][y+1].owner === owner &&
                    this.board.spaces[x-2][y+2].owner === owner &&
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }
            }
        }
        // diagonal
        for (let x = 3; x < this.board.columns; x++) {
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x-1][y-1].owner === owner &&
                    this.board.spaces[x-2][y-2].owner === owner &&
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }
            }
        }
        return win;
    }
}
