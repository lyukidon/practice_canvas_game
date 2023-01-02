import { frameRate, maps, xlength } from "../GameData";

const map = maps[0];
console.log(map)

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
                // check up
                if (map[i - xlength] !== 1) {
                    ctx.beginPath();
                    ctx.moveTo(xPos * frameRate, yPos * frameRate);
                    ctx.lineTo(
                        xPos * frameRate + frameRate,
                        yPos * frameRate
                    );
                    ctx.stroke();
                }
                // check down
                if (map[i + xlength] !== 1) {
                    ctx.beginPath();
                    ctx.moveTo(
                        xPos * frameRate,
                        yPos * frameRate + frameRate
                    );
                    ctx.lineTo(
                        xPos * frameRate + frameRate,
                        yPos * frameRate + frameRate
                    );
                    ctx.stroke();
                }
                // check left
                if (i % xlength !== 0) {
                    if (map[i - 1] !== 1) {
                        ctx.beginPath();
                        ctx.moveTo(
                            xPos * frameRate,
                            yPos * frameRate
                        );
                        ctx.lineTo(
                            xPos * frameRate,
                            yPos * frameRate + frameRate
                        );
                        ctx.stroke();
                    }
                }
                // check right
                if (i % xlength !== xlength - 1) {
                    if (map[i + 1] !== 1) {
                        ctx.beginPath();
                        ctx.moveTo(
                            xPos * frameRate + frameRate,
                            yPos * frameRate
                        );
                        ctx.lineTo(
                            xPos * frameRate + frameRate,
                            yPos * frameRate + frameRate
                        );
                        ctx.stroke();
                    }
                }
                break;
            case 2:
                ctx.fillStyle = "#008000";
                ctx.fillRect(
                    xPos * frameRate,
                    yPos * frameRate,
                    frameRate,
                    frameRate
                );
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
