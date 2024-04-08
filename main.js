import { Sprite } from './modules/sprites.js'
import { Player } from './modules/player.js'
import { Input } from './modules/input.js'
import { Bullet } from './modules/bullet.js'

let input = new Input();
let canvas = document.querySelector(".gameCanvas");
let ctx = canvas.getContext('2d');
let player = new Player(new Sprite('./images/player_test.png', .6, 500, 500, true, 2))

let bullets = []

const sprites = {
    background: new Sprite('./images/background.png'),
    player: player.sprite
};

let animFrame = 0;
let animationSpeed = 200;
let bulletTimer = 0;
const bulletRate = 3000; // Interval between bullets in milliseconds

function createCanvas(width, height){
    // Set canvas width and height
    canvas.width = width;
    canvas.height = height;
}

function setup(){
    bullets.push(new Bullet(new Sprite('./images/bullet.png', 3), {x: 1, y: 1}, {x: 500, y: 500}))
    let width = 1000;
    let height = 1000;
    createCanvas(width, height);
}

function draw(){
    for (const key in sprites) {
        const sprite = sprites[key];
        const { x, y } = sprite;

        if (sprite.animated) {
            ctx.drawImage(sprite.image, sprite.getFrameX(animFrame), 0, sprite.frameWidth, sprite.image.height, x - (sprite.width / 2), y - (sprite.height / 2), sprite.width, sprite.height);
        } else {
            ctx.drawImage(sprite.image, x, y, sprite.width, sprite.height);
        }
    }

    for(const bullet of bullets){
        ctx.drawImage(bullet.sprite.image, bullet.x, bullet.y, bullet.sprite.width, bullet.sprite.height);
    }
}

function update(){
    player.move(input.playerDir());

    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        bullet.update();
        bullet.move();
        
        if (bullet.destroyed) {
            bullets.splice(i, 1);
            i--;
        }
    }

    if (input.isShooting) {
        if (bulletTimer >= bulletRate) {
            bullets.push(new Bullet(new Sprite('./images/bullet.png', 3), input.gunDir(), player.position));
            bulletTimer = 0; // Reset the timer
        }
    }

    // Increment the bullet timer
    bulletTimer += animationSpeed;
}

var fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    // request another frame
    requestAnimationFrame(animate);

    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {

        then = now - (elapsed % fpsInterval);

        update();
        draw();

    }
}

setup();

const intervalId = setInterval(() => {
    animFrame++;
}, animationSpeed);

window.onload = function(){
    startAnimating(90);
};
