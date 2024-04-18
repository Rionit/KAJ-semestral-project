import { Entity } from './entity.js';

export class Enemy extends Entity {
    #player;
    #bullets;
    #killed;

    constructor(sprite, player, bullets, others) {
        super();
        this.sprite = sprite;
        this.position = sprite.position;
        this.#player = player;
        this.#bullets = bullets;
        this.moveSpeed = 2;
        this.#killed = false;
        this.others = others;
    }

    update() {
        this.#bullets.forEach(bullet => {
            if (this.checkHit(bullet)) this.#killed = true;
        });

        if(this.checkHit(this.#player)) this.#player.destroy();

        this.move(this.getDirection(), this.moveSpeed);
    }

    move(dir, speed) {
        let nextPosition;

        if(Math.abs(dir.x) >= Math.abs(dir.y)) {
            nextPosition = { x: this.position.x + dir.x * speed, y: this.position.y };
        } else {
            nextPosition = { x: this.position.x, y: this.position.y + dir.y * speed };
        }

        this.position = nextPosition;
        this.sprite.position = this.position;
    }

    calculateDirection(from, to) {
        const dir = { x: from.position.x - to.position.x, y: from.position.y - to.position.y };
        const magnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        const normalizedDir = { x: dir.x / magnitude, y: dir.y / magnitude };
        return normalizedDir;
    }

    getDirection(){

        for (let other of this.others) {
            if (this !== other && this.checkHit(other)) {
                return this.calculateDirection(this, other);
            }
        }

        // If no hit with other enemies, return direction towards the player
        return this.calculateDirection(this.#player, this);
    }

    checkHit(target) {
        if (Math.abs(target.x - this.x) < 50 && Math.abs(target.y - this.y) < 50) {
            return true;
        }
        return false;
    }

    get killed() {
        return this.#killed;
    }
}