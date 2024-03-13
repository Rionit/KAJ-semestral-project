import { Sprite } from './modules/sprites.js'

let canvas = document.querySelector(".gameCanvas");
let ctx = canvas.getContext('2d');
const sprites = {
    background: new Sprite('./images/background.png'),
    player: new Sprite('./images/player_test.png', true, 2)
};

let animFrame = 0;
let animationSpeed = 200;

function createCanvas(width, height){
    // Set canvas width and height
    canvas.width = width;
    canvas.height = height;
}

function setup(){
    let width = 1000;
    let height = 1000;
    createCanvas(width, height);
}

function draw(){
    for (const key in sprites) {
        const sprite = sprites[key];
        const { x, y } = sprite;

        if (sprite.animated) {
            ctx.drawImage(sprite.image, sprite.getFrameX(animFrame), 0, sprite.frameWidth, sprite.image.height, x, y, x + sprite.frameWidth, y + sprite.image.height);
        } else {
            ctx.drawImage(sprite.image, x, y, x + sprite.image.width, y + sprite.image.height);
        }
    }
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
