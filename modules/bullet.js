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

    move(){
        this.#position.x += this.#direction.x * this.#speed;
        this.#position.y += this.#direction.y * this.#speed;
    }

    get sprite(){
        return this.#sprite;
    }

    update(){
        if(this.#ttl-- < 0 ) {
            this.#destroyed = true;
        };
    }

    get destroyed() {return this.#destroyed};
    get x(){ return this.#position.x;}
    get y(){ return this.#position.y;}
}