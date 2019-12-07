class Board
{

    constructor()
    {
        this.rows = 6;
        this.columns = 7;
        this.spaces = this.createSpaces();
    }


    /**
     * Creator method for Space objects
     * @return {Array} 2D spaces collection
    */
    createSpaces()
    {
        const spaces = new Array();
        for (let i = 0; i < this.columns; i++) {
            spaces.push(new Array());
            for (let j = 0; j < this.rows; j++) {
                spaces[i].push(new Space(i, j));
            }
        }
        return spaces;
    }


    /**
     * Iterates over spaces array and calls method to render the space
     */
    drawHTMLBoard()
    {
        this.spaces.forEach(col => {
            for (let space of col) {
                space.drawSVGSpace();
            }
        });
    }
}
