import { useState, useRef, useEffect } from "react";

import right_png from "./asset/image/right.png";
import bomb_png from "./asset/image/bomb.png";

function App() {
    const canvasRef = useRef(null);
    const [pos, setPos] = useState(0);
    const scale = 60;

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const [mapData, setMapData] = useState({
        map: [],
        xlength: 0,
        ylength: 0,
    });
    useEffect(() => {
        fetch("map.json")
            .then((res) => res.json())
            .then((data) => setMapData((prev) => ({ ...prev, ...data })));
    }, []);
    const drawMap = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
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
                        ctx.lineTo(xPos * scale + scale, yPos * scale + scale);
                        ctx.stroke();
                    }
                    // check left
                    if (i % xlength !== 0) {
                        if (map[i - 1] !== 1) {
                            ctx.beginPath();
                            ctx.moveTo(xPos * scale, yPos * scale);
                            ctx.lineTo(xPos * scale, yPos * scale + scale);
                            ctx.stroke();
                        }
                    }
                    // check right
                    if (i % xlength !== xlength - 1) {
                        if (map[i + 1] !== 1) {
                            ctx.beginPath();
                            ctx.moveTo(xPos * scale + scale, yPos * scale);
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
                    ctx.fillRect(xPos * scale, yPos * scale, scale, scale);
                    break;
            }
        }
    };
    const drawCharacter = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { map, xlength } = mapData;
        const xPos = pos % xlength;
        const yPos = parseInt(pos / xlength);
        const image = new Image();
        image.src = right_png;
        switch (map[yPos * xlength + xPos]) {
            case 0:
                ctx.drawImage(
                    image,
                    xPos * scale + 15,
                    yPos * scale,
                    scale,
                    scale
                );
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
    const eventCharacter = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { map, xlength, ylength } = mapData;
        switch (e.keyCode) {
            // Up
            case 38:
                // prevent moving beyond the map
                if (pos - xlength >= 0) {
                    if (map[pos - xlength] !== 1) {
                        setPos((prev) => prev - xlength);
                    }
                }
                break;
            // Down
            case 40:
                if (parseInt(pos / xlength) < ylength - 1) {
                    if (map[pos + xlength] !== 1) {
                        setPos((prev) => prev + xlength);
                    }
                }
                break;
            // Left
            case 37:
                if (pos % xlength !== 0) {
                    if (map[pos - 1] !== 1) {
                        setPos((prev) => prev - 1);
                    }
                }
                break;
            // right
            case 39:
                if (pos % xlength !== xlength - 1) {
                    if (map[pos + 1] !== 1) {
                        setPos((prev) => prev + 1);
                    }
                }
                break;
            // shift
            // drop bomb
            case 16:
                console.log("shift");
                setBombData([
                    ...dropBombData,
                    {
                        pos,
                        time: 3,
                    },
                ]);
                break;
        }
    };
    const [dropBombData, setBombData] = useState([]);
    useEffect(() => {
        console.log("interval");
        let explosion = setInterval(() => {
            const dropTemp = dropBombData.reduce((save, cur) => {
                if (cur.time !== 0) {
                    cur.time--;
                    save.push(cur);
                }
                return save;
            }, []);
            setBombData([...dropTemp]);
            drawBomb();
        }, 1000);
        return () => {
            console.log("clear");
            console.log(dropBombData);
            clearInterval(explosion);
        };
    }, [dropBombData]);
    const drawBomb = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { map, xlength, ylength } = mapData;
        const image = new Image();
        image.src = bomb_png;
        for (let i = 0; i < dropBombData.length; i++) {
            const bombPos = dropBombData[i].pos;
            const xPos = bombPos % xlength;
            const yPos = parseInt(bombPos / xlength);
            console.log(bombPos);
            ctx.fillRect(xPos * scale, yPos * scale, scale, scale);
            // const xPos = bombPos % xlength;
            // const yPos = parseInt(bombPos / xlength);
            // ctx.drawImage(image, xPos * scale, yPos * scale, scale, scale);
        }
    };
    const draw = () => {
        clearCanvas();
        drawMap();
        drawCharacter();
        drawBomb();
    };
    useEffect(() => {
        document.addEventListener("keydown", eventCharacter);
        draw();
        return () => {
            document.removeEventListener("keydown", eventCharacter);
        };
    }, [pos, mapData, dropBombData]);
    return (
        <div>
            <canvas ref={canvasRef} width={900} height={600} />
        </div>
    );
}

export default App;
