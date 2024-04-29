import { Entity } from './entity.js';

export class Player extends Entity {
    #game;

    constructor(sprite, game) {
        super();
        this.#game = game;
        this.sprite = sprite;
        this.position = {x: 525, y: 525};
        this.moveSpeed = 4;
    }

    update() {
        this.move(this.#game.playerDirection, this.moveSpeed);
    }
}