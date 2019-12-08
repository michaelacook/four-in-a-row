class Token
{

    constructor(index, owner)
    {
        this.owner = owner;
        this.id =  `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }


    /**
     * Renders a token object on the DOM
     */
    drawHTMLToken()
    {
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }


    /**
     * @return Token object HTML
     */
    get htmlToken()
    {
        return document.getElementById(this.id);
    }


    /**
     * Gets left offset of html token
     * @return {int} left offset in pixels
     */
    get offsetLeft()
    {
        return this.htmlToken.offsetLeft;
    }


    /**
     * Moves html token one column left
     */
    moveLeft()
    {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation--;
        }
    }


    /**
     * Moves html token one column right
     * @param {int} cols - number of columns in the game board
     */
    moveRight(cols)
    {
        if (this.columnLocation < cols - 1) {
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation++;
        }
    }


    /**
     * Drops html token into targeted board space
     * @param   {Object}   target - Targeted space for dropped token
     * @param   {function} reset  - The reset function to call after the drop animation has completed.
     */
    drop(target, reset)
    {
        this.dropped = true;
        target.token = this;
        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }
}
