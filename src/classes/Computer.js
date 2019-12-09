class Computer extends Player
{

    constructor(name, id, color, active=false)
    {
        super(name, id, color, active=false);
    }


    /**
     * Find a viable unoccupied space
     * Currently calculates a random column, but will be developed
     */
    calculateMove(cols)
    {
        return Math.floor(Math.random() * cols);
    }
}
