let canvas = document.querySelector(".gameCanvas");
let ctx = canvas.getContext('2d');
let img = new Image();

function createCanvas(width, height){
    // Set canvas width and height
    canvas.width = width;
    canvas.height = height;
}

function setup(){

    img.src = './images/background.png';
    let width = 1000;
    let height = 1000;
    createCanvas(width, height);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, width, height);
    };
    
}

setup();