class Token
{

    constructor(index, owner)
    {
        this.owner = owner;
        this.id =  `token-${index}-${owner.id}`;
        this.dropped = false;
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
        const token = this.drawHTMLToken();
        return token;
    }
}
