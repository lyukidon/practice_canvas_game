import { build, scale, maps, xlength, keyCodeNum } from "../GameData";
import { gameResource } from "../GameData";
import bush from "../assets/image/bush.jpg";
import wall from "../assets/image/wall.png";
import wood from "../assets/image/wood.png";
import bomb from "../assets/image/bomb.png";

const map = maps[0];

const clearCanvas = (canvas, ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const mapRenderer = (canvas, ctx) => {
    /////////////////////////// Delete after Drawing Map ///////////////////////
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
    ////////////////////////////////////////////////////////////////////////////
    // 0 :blank, 1 :wall, 2 :bush
    for (let i = 0; i < map.length; i++) {
        const xPos = i % xlength;
        const yPos = (i / xlength) | 0;
        const img = new Image();
        switch (map[i]) {
            case 1:
                img.src = wall;
                break;
            case 2:
                img.src = bush;
                break;
            case 3:
                img.src = wood;
                break;
        }
        img.onload = () => {
            ctx.drawImage(img, xPos * scale, yPos * scale, scale, scale);
        };
    }
};

const characterRenderer = (canvas, ctx, pos) => {
    const xPos = pos % xlength;
    const yPos = parseInt(pos / xlength);
    switch (map[yPos * xlength + xPos]) {
        case 0:
            ctx.beginPath();
            ctx.arc(
                xPos * scale + scale / 2,
                yPos * scale + scale / 2,
                scale / 2,
                0,
                2 * Math.PI
            );
            ctx.stroke();
            break;
    }
};

const bombRenderer = (ctx, dropBombData, time) => {
    const image = new Image();
    image.src = bomb;
    for (let i = 0; i < dropBombData.length; i++) {
        const bombPos = dropBombData[i].pos;
        const xPos = bombPos % xlength;
        const yPos = parseInt(bombPos / xlength);
        image.onload = ctx.drawImage(
            image,
            xPos * scale,
            yPos * scale,
            scale,
            scale
        );
        if (dropBombData[i].time - time > 3) {
            explosionRenderer(ctx, dropBombData[i], time);
        }
    }
};

// prettier-ignore
const explosionRenderer = (ctx, eachBombData, time) => {
    const bombPos = eachBombData.pos;
    const duration = eachBombData.time - time;
    const explosionRange = duration - 3;
    const xPos = bombPos % xlength;
    const yPos = parseInt(bombPos / xlength);
    for (let i = 1; i <= 2; i++) {
        const range = explosionRange * (-1)**i;
        ctx.fillStyle = "#f00"
        ctx.fillRect(
            (xPos - range) * scale,
            yPos * scale,
            scale,
            scale
        );
        ctx.fillRect(
            xPos * scale,
            (yPos - range) * scale,
            scale,
            scale
        );
    }
};

function GameRenderer(canvas, ctx, pos, dropBombData, time) {
    clearCanvas(canvas, ctx);
    mapRenderer(canvas, ctx);
    characterRenderer(canvas, ctx, pos);
    bombRenderer(ctx, dropBombData, time);
}

class Temp {
    constructor(canvas, ctx, pos, dropBombData) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.pos = pos;
        this.dropBombData = dropBombData;
        this.xlength = canvas.width / scale;
    }

    clearCanvas() {
        const { canvas, ctx } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    characterRenderer(setPos,e) {
        const { canvas, ctx } = this;
        switch (e.keyCode){
            case keyCodeNum.UP:
                
                break
            case keyCodeNum.DOWN:
                break
            case keyCodeNum.LEFT:
                break
            case keyCodeNum.RIGHT:
                break
        }
    }
}

export default Temp;

// export default GameRenderer;
