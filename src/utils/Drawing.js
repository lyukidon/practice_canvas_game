import { mapData } from "../assets/map/1";
import { scale } from "../gameData";

export const clearCanvas = (canvas, ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawMap = (canvas, ctx) => {
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
    const { map, xlength } = mapData;
    for (let i = 0; i < map.length; i++) {
        const xPos = i % xlength;
        const yPos = (i / xlength) | 0;
        switch (map[i]) {
            case 1:
                // check up
                if (map[i - xlength] !== 1) {
                    ctx.beginPath();
                    ctx.moveTo(xPos * scale, yPos * scale);
                    ctx.lineTo(xPos * scale + scale, yPos * scale);
                    ctx.stroke();
                }
                // check down
                if (map[i + xlength] !== 1) {
                    ctx.beginPath();
                    ctx.moveTo(xPos * scale, yPos * scale + scale);
                    ctx.lineTo(
                        xPos * scale + scale,
                        yPos * scale + scale
                    );
                    ctx.stroke();
                }
                // check left
                if (i % xlength !== 0) {
                    if (map[i - 1] !== 1) {
                        ctx.beginPath();
                        ctx.moveTo(xPos * scale, yPos * scale);
                        ctx.lineTo(
                            xPos * scale,
                            yPos * scale + scale
                        );
                        ctx.stroke();
                    }
                }
                // check right
                if (i % xlength !== xlength - 1) {
                    if (map[i + 1] !== 1) {
                        ctx.beginPath();
                        ctx.moveTo(
                            xPos * scale + scale,
                            yPos * scale
                        );
                        ctx.lineTo(
                            xPos * scale + scale,
                            yPos * scale + scale
                        );
                        ctx.stroke();
                    }
                }
                break;
            case 2:
                ctx.fillStyle = "#008000";
                ctx.fillRect(
                    xPos * scale,
                    yPos * scale,
                    scale,
                    scale
                );
                break;
        }
    }
};

export const drawCharacter = (canvas, ctx, pos, e) => {
    const { map, xlength } = mapData;
    const xPos = pos % xlength;
    const yPos = parseInt(pos / xlength);
    // const image = new Image();
    // image.src = right_png;
    switch (map[yPos * xlength + xPos]) {
        case 0:
            // ctx.drawImage(
            //     image,
            //     xPos * scale + 15,
            //     yPos * scale,
            //     scale,
            //     scale
            // );
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

export const drawBomb = (canvas, ctx, pos, dropBombData) => {
    const { map, xlength, ylength } = mapData;
    // const image = new Image();
    // image.src = bomb_png;
    for (let i = 0; i < dropBombData.length; i++) {
        const bombPos = dropBombData[i].pos;
        const xPos = bombPos % xlength;
        const yPos = parseInt(bombPos / xlength);
        ctx.fillRect(xPos * scale, yPos * scale, scale, scale);
        // const xPos = bombPos % xlength;
        // const yPos = parseInt(bombPos / xlength);
        // ctx.drawImage(image, xPos * scale, yPos * scale, scale, scale);
    }
};
