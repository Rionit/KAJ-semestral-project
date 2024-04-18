import { Entity } from './entity.js';

export class Enemy extends Entity {
    #player;
    #bullets;
    #killed;

    constructor(sprite, player, bullets) {
        super();
        this.sprite = sprite;
        this.position = sprite.position;
        this.#player = player;
        this.#bullets = bullets;
        this.moveSpeed = 2;
        this.#killed = false;
    }

    update() {
        this.#bullets.forEach(bullet => {
            if (this.checkHit(bullet)) this.#killed = true;
        });

        this.checkHit(this.#player);

        this.move(this.getDirection(), this.moveSpeed);
    }

    move(dir, speed) {
        this.position = { x: this.position.x + dir.x * speed, y: this.position.y + dir.y * speed };
        this.sprite.position = this.position;
    }

    getDirection(){
        const dir = { x: this.#player.position.x - this.position.x, y: this.#player.position.y - this.position.y };

        // Calculate the magnitude of the direction vector
        const magnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
    
        // Normalize the direction vector
        const normalizedDir = { x: dir.x / magnitude, y: dir.y / magnitude };

        return normalizedDir;
    }

    checkHit(target) {
        if (Math.abs(target.x - this.x) < 25 && Math.abs(target.y - this.y) < 25) {
            target.destroy();
            return true;
        }
        return false;
    }

    get killed() {
        return this.#killed;
    }
}