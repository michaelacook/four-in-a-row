class Player
{

    constructor(name, id, color, active=false)
    {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
    }


    /**
     * Creates an array of Token objects for the player
     * @param {int} num - number of token objects to create
    */
    createTokens(num)
    {
        const tokens = new Array();
        for (let i = 0; i < num; i++) {
            tokens.push(new Token(i, this));
        }
        return tokens;
    }


    /**
     * Check if player has any undropped tokens
     * @return {Boolean}
     */
    checkTokens()
    {
        if (this.unusedTokens.length === 0) {
            return false;
        }
        return true;
    }


    /**
     * Gets the first unused token
     * @return {object} Token
     */
    get activeToken()
    {
        return this.unusedTokens[0];
    }


    /**
     * @return {Array} of all Token objects with a dropped value of false
     */
    get unusedTokens()
    {
        return this.tokens.filter(token => !token.dropped);
    }
}
