import { build, frameRate, maps, xlength } from "../GameData";
import { gameResource } from "../GameData";
import bush from "../assets/image/bush.png";
import wall from '../assets/image/wall.png'

const map = maps[0];
console.log(map);

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
        switch (map[i]) {
            case 1:
                const wallImg = new Image();
                wallImg.src = wall;
                wallImg.onload = () => {
                    ctx.drawImage(
                        wallImg,
                        xPos * frameRate,
                        yPos * frameRate,
                        frameRate,
                        frameRate
                    );
                };
                break;
            case 2:
                const bushImg = new Image();
                bushImg.src = bush;
                bushImg.onload = () => {
                    ctx.drawImage(
                        bushImg,
                        xPos * frameRate,
                        yPos * frameRate-10,
                        frameRate,
                        frameRate+20
                    );
                };
                break;
        }
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

const bombRenderer = (canvas, ctx, pos, dropBombData) => {
    // const image = new Image();
    // image.src = bomb_png;
    for (let i = 0; i < dropBombData.length; i++) {
        const bombPos = dropBombData[i].pos;
        const xPos = bombPos % xlength;
        const yPos = parseInt(bombPos / xlength);
        ctx.fillRect(
            xPos * frameRate,
            yPos * frameRate,
            frameRate,
            frameRate
        );
        // const xPos = bombPos % xlength;
        // const yPos = parseInt(bombPos / xlength);
        // ctx.drawImage(image, xPos * frameRate, yPos * frameRate, frameRate, frameRate);
    }
};

function GameRenderer(canvas, ctx, pos, dropBombData) {
    clearCanvas(canvas, ctx);
    mapRenderer(canvas, ctx);
    characterRenderer(canvas, ctx, pos);
    bombRenderer(canvas, ctx, pos, dropBombData);
}

export default GameRenderer;
