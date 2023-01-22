import { BUILD_TYPE, scale, maps, xlength, keyCodeNum, MOVING_RANGE } from "../GameData";

export default class {
    constructor(canvas, ctx, round) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.round = round;
        this.xPos = 10;
        this.yPos = 10;
    }

    init(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }

    clearCanvas() {
        const { canvas, ctx } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    eventCharacter(e) {
        const { canvas, ctx } = this;
        console.log(this.xPos, this.yPos);
        switch (e.keyCode) {
            case keyCodeNum.UP:
                this.yPos -= MOVING_RANGE;
                break;
            case keyCodeNum.DOWN:
                this.yPos += MOVING_RANGE;
                break;
            case keyCodeNum.LEFT:
                this.xPos -= MOVING_RANGE;
                break;
            case keyCodeNum.RIGHT:
                this.xPos += MOVING_RANGE;
                break;
        }
    }

    positionChange(xPos, yPos) {
        this.xlength = this.canvas.width / scale;
        if (yPos) {
            // 2 dimensional coordinate
            return xPos / 60 + ((yPos / 60) | 0) * this.xlength;
        } else {
            // 1 dimensional coordinate
        }
    }

    moveCharacter(e) {
        const { xPos, yPos } = this;
        const pos = this.positionChange(xPos, yPos);
        this.eventCharacter(e);
        console.log(pos);
    }

    characterRenderer() {
        let { ctx, xPos, yPos } = this;
        this.clearCanvas();
        ctx.fillRect(xPos, yPos, scale - 20, scale - 20);
    }
}
