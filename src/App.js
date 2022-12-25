import { useState, useRef, useEffect } from 'react';

function App() {
    const canvasRef = useRef(null);
    const [pos, setPos] = useState({
        x: 0,
        y: 0,
    });
    const scale = 60;

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const [map, setMap] = useState([]);
    useEffect(() => {
        fetch('map.json')
            .then((res) => res.json())
            .then((data) => setMap([...data.map]));
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
        for (let i = 0; i < map.length; i++) {
            const xlength = 15;
            const xPos = i % 15;
            const yPos = (i / 15) | 0;
            console.log(xPos, yPos);
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
        switch (map[pos.y * 15 + pos.x]) {
            case 0:
                ctx.beginPath();
                ctx.arc(
                    pos.x * scale + scale / 2,
                    pos.y * scale + scale / 2,
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
        switch (e.keyCode) {
            // right
            case 39:
                if ((pos.x + 1) * scale < canvas.width) {
                    if (map[pos.y][pos.x + 1] !== 1) {
                        setPos((prev) => ({
                            ...prev,
                            x: pos.x + 1,
                        }));
                    }
                }
                break;
            // Left
            case 37:
                if ((pos.x - 1) * scale >= 0) {
                    if (map[pos.y][pos.x - 1] !== 1) {
                        setPos((prev) => ({
                            ...prev,
                            x: pos.x - 1,
                        }));
                    }
                }
                break;
            // Up
            case 38:
                if ((pos.y - 1) * scale >= 0) {
                    if (map[pos.y - 1][pos.x] !== 1) {
                        setPos((prev) => ({
                            ...prev,
                            y: pos.y - 1,
                        }));
                    }
                }
                break;
            // Down
            case 40:
                if ((pos.y + 1) * scale < canvas.height) {
                    if (map[pos.y + 1][pos.x] !== 1) {
                        setPos((prev) => ({
                            ...prev,
                            y: pos.y + 1,
                        }));
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
    }, [pos, map]);
    return (
        <div>
            <canvas ref={canvasRef} width={900} height={600} />
            {console.log(pos)}
        </div>
    );
}

export default App;
