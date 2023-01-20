import { BUILD_TYPE, scale, maps, xlength, keyCodeNum, MOVING_RANGE } from "../GameData";
import { gameResource } from "../GameData";
import bush from "../assets/image/bush.jpg";
import wall from "../assets/image/wall.png";
import wood from "../assets/image/wood.png";
import bomb from "../assets/image/bomb.png";

class Temp {
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

    getStructureResource(structure) {
        const img = new Image();
        switch (structure) {
            case BUILD_TYPE.WALL:
                img.src = wall;
                break;
            case BUILD_TYPE.BUSH:
                img.src = bush;
                break;
            case BUILD_TYPE.WOOD:
                img.src = wood;
                break;
        }
        return img;
    }

    mapRenderer(round) {
        this.xlength = this.canvas.width / scale;
        const { canvas, ctx, xlength } = this;
        const map = maps[round];
        for (let i = 0; i < map.length; i++) {
            const x = i % xlength * scale;
            const y = ((i / xlength) | 0) * scale;
            const img = this.getStructureResource(map[i]);
            img.onload = () => ctx.drawImage(img, x, y, scale, scale);
        }
        ctx.strokeStyle = "#f00";
        for (let i = 0; i <= canvas.height / scale; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * scale);
            ctx.lineTo(canvas.width, i * scale);
            ctx.stroke();
        }
        for (let i = 0; i <= canvas.width / scale; i++) {
            ctx.beginPath();
            ctx.moveTo(i * scale, 0);
            ctx.lineTo(i * scale, canvas.height);
            ctx.stroke();
        }
        ctx.strokeStyle = "#000";
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
        console.log(xPos, yPos);
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

export default Temp;

// export default GameRenderer
