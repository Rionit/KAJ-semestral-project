import { Entity } from './entity.js';

export class Enemy extends Entity {
    #game;
    #killed;

    constructor(sprite, game) {
        super();
        this.sprite = sprite;
        this.position = sprite.position;
        this.player = game.player;
        this.bullets = game.bullets;
        this.hitboxes = game.hitboxes;
        this.moveSpeed = 2;
        this.#killed = false;
        this.others = game.enemies;
    }

    update() {
        this.bullets.forEach(bullet => {
            if (this.checkHit(bullet)) {
                this.#killed = true;
                bullet.destroy();
            };
        });

        if(this.checkHit(this.player)) this.player.destroy();

        this.move(this.getDirection(), this.moveSpeed);
    }

    move(dir, speed) {
        let nextPosition;

        // This makes them not walk straight towards player
        if(Math.abs(dir.x) >= Math.abs(dir.y)) {
            nextPosition = { x: this.position.x + dir.x * speed, y: this.position.y };
        } else {
            nextPosition = { x: this.position.x, y: this.position.y + dir.y * speed };
        }

        this.position = nextPosition;
        this.sprite.position = this.position;
    }

    checkCollision(position) {
        // Iterate through each hitbox and check for collision
        for (let hitbox of this.hitboxes) {
            if (hitbox.isInside(position)) {
                return true; // Collision detected
            }
        }
        return false; // No collision detected
    }

    calculateDirection(from, to) {
        const dir = { x: from.position.x - to.position.x, y: from.position.y - to.position.y };
        const magnitude = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        const normalizedDir = { x: dir.x / magnitude, y: dir.y / magnitude };
        return normalizedDir;
    }

    // If close to enemy, tries to move away from them, otherwise towards player
    getDirection(){

        // Check if close to other enemy
        for (let other of this.others) {
            if (this !== other && this.checkHit(other)) {
                return this.calculateDirection(this, other);
            }
        }

        // Check if colliding with hitbox
        if (this.checkCollision(this.position)) {
            // Calculate direction towards the center of the map (525, 525)
            return this.calculateDirection({ position: { x: 525, y: 525 }}, { position: this.position });
        }

        // If no hit with other enemies or hitboxes, return direction towards the player
        return this.calculateDirection(this.player, this);
    }

    checkHit(target) {
        if (Math.abs(target.x - this.x) < 40 && Math.abs(target.y - this.y) < 40) {
            return true;
        }
        return false;
    }

    get killed() {
        return this.#killed;
    }
}