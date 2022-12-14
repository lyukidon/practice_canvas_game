import { build, frameRate, maps, xlength } from "../GameData";
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
    for (let i = 0; i <= canvas.height / frameRate; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * frameRate);
        ctx.lineTo(canvas.width, i * frameRate);
        ctx.stroke();
    }
    for (let i = 0; i <= canvas.width / frameRate; i++) {
        ctx.beginPath();
        ctx.moveTo(i * frameRate, 0);
        ctx.lineTo(i * frameRate, canvas.height);
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
            ctx.drawImage(
                img,
                xPos * frameRate,
                yPos * frameRate,
                frameRate,
                frameRate
            );
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
                xPos * frameRate + frameRate / 2,
                yPos * frameRate + frameRate / 2,
                frameRate / 2,
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
            xPos * frameRate,
            yPos * frameRate,
            frameRate,
            frameRate
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
            (xPos - range) * frameRate,
            yPos * frameRate,
            frameRate,
            frameRate
        );
        ctx.fillRect(
            xPos * frameRate,
            (yPos - range) * frameRate,
            frameRate,
            frameRate
        );
    }
};

function GameRenderer(canvas, ctx, pos, dropBombData, time) {
    clearCanvas(canvas, ctx);
    mapRenderer(canvas, ctx);
    characterRenderer(canvas, ctx, pos);
    bombRenderer(ctx, dropBombData, time);
}

export default GameRenderer;
