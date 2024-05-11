export class Joystick{
    constructor(){
        this.joystick = document.querySelector('.joystick');
    }

    rotate(direction){
        let z = direction.x * 10;
        let x = direction.y * 20;

        // Fake light shading (darker when tilted towards player, lighter towards arcade screen)
        this.joystick.style.fill = `rgb(${50-x-z},${50-x-z},${50-x-z})`;
        
        // Fake 3D sides, makes it look 3D
        if(Math.abs(direction.x) == Math.abs(direction.y)) this.joystick.style.filter = `drop-shadow(0px ${-x}px 0px black)`;
        else this.joystick.style.filter = `drop-shadow(${-z}px ${-x}px 0px black)`;
        
        // Rotate in 3D depending on direction
        this.joystick.style.transform = `translateX(1100px) translateY(-300px) rotateZ(${z}deg) rotateX(${-30 + x}deg)`;
    }
}