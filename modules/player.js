import { Entity } from './entity.js';

export class Player extends Entity {
    #game;

    constructor(sprite, game) {
        super();
        console.log(game);
        this.#game = game;
        this.sprite = sprite;
        this.position = {x: 525, y: 525};
        this.moveSpeed = 4;
    }

    destroy(){
        this.#game.leaderboard.addPlayer("koko", this.#game.score);
        this.#game.restart();
    }

    update() {
        this.move(this.#game.input.playerDirection, this.moveSpeed);
    }
}