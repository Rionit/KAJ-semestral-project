export class Player {
    #sprite
    #moveSpeed

    constructor(sprite) {
        this.#sprite = sprite;
        this.#moveSpeed = 6;
    }

    checkBoundaryX(x){
        let s = this.#sprite;
        if(x - (s.width / 2) <= 50 || x + (s.width / 2) >= 950) return false;
        return true;
    }

    checkBoundaryY(y){
        let s = this.#sprite;
        if(y - (s.height / 2) <= 50 || y + (s.height / 2) >= 950) return false;
        return true;
    }

    move(dir){
        let newPos = {x: this.#sprite.x + dir.x * this.#moveSpeed, y: this.#sprite.y + dir.y * this.#moveSpeed};
        if(this.checkBoundaryX(newPos.x)) this.#sprite.x = newPos.x;
        if(this.checkBoundaryY(newPos.y)) this.#sprite.y = newPos.y;
        
    }

    get sprite(){
        return this.#sprite;
    }
}
