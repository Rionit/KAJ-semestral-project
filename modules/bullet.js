export class Bullet {
    #sprite
    #speed
    #direction
    #position
    #destroyed
    #ttl

    constructor(sprite, direction, position){
        this.#sprite = sprite;
        this.#direction = direction;
        this.#position = position;
        this.#speed = 5;
        this.#ttl = 250;
    }

    checkBoundaryY(y){
        let s = this.#sprite;
        return (y - (s.height / 2) <= 50 || y + (s.height / 2) >= 950) ? false : true;
    }

    checkBoundaryX(x){
        let s = this.#sprite;
        return (x - (s.width / 2) <= 50 || x + (s.width / 2) >= 950) ? false : true;
    }

    move(){
        let newPos = {x: this.#position.x + this.#direction.x * this.#speed, y: this.#position.y + this.#direction.y * this.#speed};
        
        if(!this.checkBoundaryX(newPos.x) || !this.checkBoundaryX(newPos.y)) this.#destroyed = true;

        this.#position.x = newPos.x;
        this.#position.y = newPos.y;
    }

    get sprite(){
        return this.#sprite;
    }

    update(){
        // if somehow glitches it will die after some time
        if(this.#ttl-- < 0 ) {
            this.#destroyed = true;
        };

        this.move();
        this.#sprite.position = this.#position;
    }

    destroy(){this.#destroyed = true}

    get destroyed() {return this.#destroyed};
    get x(){ return this.#position.x;}
    get y(){ return this.#position.y;}
}