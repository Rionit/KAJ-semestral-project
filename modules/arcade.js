export class Arcade {

    constructor() {
        this.arcade = document.querySelector('.arcade');
        this.isExpanded = false;

        this.transform = {
            scale: 0.6,
            rotateX: -30,
            rotateY: -30,
            rotateZ: 0,
            translateX: 0,
            translateY: 0,
            translateZ: 0
        }

        this.applyTransform();

        this.arcade.addEventListener("click", this.handleArcadeClick.bind(this));
    }

    applyTransform(){
        const { scale, rotateX, rotateY, rotateZ, translateX, translateY, translateZ } = this.transform;

        this.arcade.style.transform = `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateX(${translateX}) translateY(${translateY}) translateZ(${translateZ})`;
    }

    handleArcadeClick(event) {

        if(event.target == document.querySelector('canvas') && this.isExpanded){
            return;
        }

        if (!this.isExpanded) {
            // console.log('EXPANDING');
            this.transform.scale = 1;
            this.transform.rotateX = 0;
            this.transform.rotateY = 0;
            this.isExpanded = true;
        } else {
            const boundingRect = this.arcade.getBoundingClientRect();
            const middleX = boundingRect.left + boundingRect.width / 2;

            if (Math.abs(middleX - event.clientX) < 250) {
                // console.log('MIDDLE');
                this.isExpanded = false;
                this.transform.scale = .6;
                this.transform.rotateX = -30;
                this.transform.rotateY = -30;
            } else if (event.clientX > middleX) {
                // console.log('RIGHT');
                this.transform.rotateY += -90;
            } else {
                // console.log('LEFT');
                this.transform.rotateY += 90;
            }
        }

        this.applyTransform();
    }
}