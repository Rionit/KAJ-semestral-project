let canvas = document.querySelector(".gameCanvas");
let ctx = canvas.getContext('2d');
let background = new Image();
let player = new Image();

function createCanvas(width, height){
    // Set canvas width and height
    canvas.width = width;
    canvas.height = height;
}

function setup(){

    let width = 1000;
    let height = 1000;
    createCanvas(width, height);
    background.src = './images/background.png';
    player.src = './images/player_test.png';
}

function draw(){
    ctx.drawImage(background, 0, 0, 1000, 1000);
    ctx.drawImage(player, 0, 0, 100, 100);
}

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

window.onload = function(){
    startAnimating(90);
};
