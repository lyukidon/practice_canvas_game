import { useState, useRef, useEffect } from 'react';

function App() {
    const canvasRef = useRef(null);
    const [pos, setPos] = useState(20);
    const scale = 60;

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const [mapData, setMapData] = useState({
        map: [],
        xlength: 0,
        ylength: 0,
    });
    useEffect(() => {
        fetch('map.json')
            .then((res) => res.json())
            .then((data) => setMapData((prev) => ({ ...prev, ...data })));
    }, []);
    const drawMap = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        /////////////////////////// Delete after Drawing Map ///////////////////////
        ctx.strokeStyle = '#f00';
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
        ctx.strokeStyle = '#000';
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
                    ctx.fillStyle = '#008000';
                    ctx.fillRect(xPos * scale, yPos * scale, scale, scale);
                    break;
            }
        }
    };
    const drawCharacter = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { map, xlength } = mapData;
        const xPos = pos % xlength;
        const yPos = (pos / xlength) | 0;
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
    const moveCharacter = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
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
                console.log(pos);
                if (Math.ceil(pos / xlength) + 1 < ylength) {
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
            case 16:
                ctx.fillRect(pos.x, pos.y, scale, scale);
                break;
        }
    };

    const [dropBombData, setBombData] = useState([]);
    const dropBomb = (e) => {};
    const drawBomb = () => {};
    const draw = () => {
        clearCanvas();
        drawMap();
        drawCharacter();
        if (dropBombData.length < 0) {
            drawBomb();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', moveCharacter);
        draw();
        document.addEventListener('keydown', dropBomb);
        return () => {
            document.removeEventListener('keydown', moveCharacter);
            document.removeEventListener('keydown', dropBomb);
        };
    }, [pos, mapData]);
    return (
        <div>
            <canvas ref={canvasRef} width={900} height={600} />
        </div>
    );
}

export default App;
