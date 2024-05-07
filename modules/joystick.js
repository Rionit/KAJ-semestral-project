export class Joystick{
    constructor(){
        this.joystick = document.querySelector('.joystick');
    }

    rotate(direction){
        let z = direction.x * 10;
        let x = direction.y * 20;
        this.joystick.style.fill = `rgb(${50-x-z},${50-x-z},${50-x-z})`;
        if(Math.abs(direction.x) == Math.abs(direction.y)) this.joystick.style.filter = `drop-shadow(0px ${-x}px 0px black)`;
        else this.joystick.style.filter = `drop-shadow(${-z}px ${-x}px 0px black)`;
        this.joystick.style.transform = `translateX(1100px) translateY(-300px) rotateZ(${z}deg) rotateX(${-30 + x}deg)`;
    }
}