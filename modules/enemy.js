export class Enemy {
    #sprite
    #moveSpeed
    #position
    #player
    #bullets
    #killed

    constructor(sprite, player, bullets) {
        this.#position = sprite.position;
        this.#sprite = sprite;
        this.#player = player;
        this.#moveSpeed = 2;
        this.#killed = false;
        this.#bullets = bullets;
    }

    update(){

        this.#bullets.forEach(bullet => this.checkHit(bullet));

        this.move({x: this.#player.position.x - this.#position.x, y:  this.#player.position.y - this.#position.y});
    }

    move(dir){
        // Calculate the magnitude of the direction vector
        const magnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
    
        // Normalize the direction vector
        const normalizedDir = { x: dir.x / magnitude, y: dir.y / magnitude };
    
        // Calculate the new position based on the normalized direction vector and move speed
        let newPos = {x: this.#sprite.x + normalizedDir.x * this.#moveSpeed, y: this.#sprite.y + normalizedDir.y * this.#moveSpeed};
        
        // Update the sprite position
        this.#sprite.x = newPos.x;
        this.#sprite.y = newPos.y;
    }

    checkHit(bullet){
        if(Math.abs(bullet.x - this.x) < 25 && Math.abs(bullet.y - this.y) < 25){
            this.#killed = true;
            bullet.destroy();
        }
    }

    get sprite(){
        return this.#sprite;
    }

    get killed() {return this.#killed};
    get position(){return {x: this.#sprite.x, y: this.#sprite.y}}
    get x(){ return this.#position.x;}
    get y(){ return this.#position.y;}
}
