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
     * Initializes gameplay
     */
    startGame()
    {
        this.ready = true;
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
    }


    /**
    * @return Player object where active property is true
    */
    get activePlayer()
    {
        return this.players.find(player => player.active);
    }
}
