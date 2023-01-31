import {
    BUILD_TYPE,
    SCALE,
    maps,
    xlength,
    keyCodeNum,
    MOVING_RANGE,
} from "../GameData";

export default class {
    constructor(){
        this.xPos = 0;
        this.yPos = 0
        this.velocity = 0;
    }

    init(canvas, ctx, round) {
        this.canvas = canvas;
        this.ctx = ctx
        this.round = round;
    }
    clearCanvas() {
        const { canvas, ctx } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    eventCharacter(e) {
        console.log('event')
        switch (e.keyCode) {
            case keyCodeNum.UP:
                this.yPos -= SCALE.BLOCK;
                break;
            case keyCodeNum.DOWN:
                this.yPos += SCALE.BLOCK;
                break;
            case keyCodeNum.LEFT:
                this.xPos -= SCALE.BLOCK;
                break;
            case keyCodeNum.RIGHT:
                this.xPos += SCALE.BLOCK;
                break;
        }
    }

    positionChange(xPos, yPos) {
        this.xlength = this.canvas.width / SCALE.BLOCK;
        if (yPos) {
            // 2 dimensional coordinate
            return (
                parseInt(xPos / SCALE.BLOCK) +
                parseInt(yPos / SCALE.BLOCK) * this.xlength
            );
        } else {
            // 1 dimensional coordinate
        }
    }

    moveCharacter(e){
        const {xPos,yPos} = this
        const pos = this.positionChange(xPos, yPos)
        this.eventCharacter(e);
    }

    characterRenderer() {
        let { ctx, xPos, yPos } = this;
        this.clearCanvas();
        ctx.fillRect(xPos+10, yPos+10, SCALE.CHARACTER, SCALE.CHARACTER);
    }
}