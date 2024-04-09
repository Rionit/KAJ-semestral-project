import { Entity } from './entity.js';

export class Player extends Entity {
    #input;

    constructor(sprite, input) {
        super();
        this.#input = input;
        this.sprite = sprite;
        this.position = {x: 525, y: 525};
        this.moveSpeed = 4;
    }

    update() {
        this.move(this.#input.playerDirection, this.moveSpeed);
    }

    checkBoundaryX() {
        return super.checkBoundaryX(this.sprite.x, this.sprite.width, 50, 950);
    }

    checkBoundaryY() {
        return super.checkBoundaryY(this.sprite.y, this.sprite.height, 50, 950);
    }
}