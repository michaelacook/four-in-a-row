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
        if (column[0].token !== null) {
            return;
        } else {
            for (let i = 5; i >= 0; i--) {
                if (column[i].token === null) {
                    this.ready = false;
                    activeToken.drop(column[i]);
                    break;
                }
            }
        }
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
}
