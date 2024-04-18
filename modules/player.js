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
}