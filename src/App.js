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
        // const mapData = await (await fetch('map.json')).json();
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
        ///////////////////////////////////////////////////
        ctx.strokeStyle = '#000';
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === 1) {
                    if (map[i - 1][j] !== 1) {
                        ctx.beginPath();
                        ctx.moveTo(j * scale, i * scale);
                        ctx.lineTo(j * scale + scale, i * scale);
                        ctx.stroke();
                    }
                    if (map[i + 1][j] !== 1) {
                        ctx.beginPath();
                        ctx.moveTo(j * scale, i * scale + scale);
                        ctx.lineTo(j * scale + scale, i * scale + scale);
                        ctx.stroke();
                    }
                    if (map[i][j - 1] !== 1) {
                        ctx.beginPath();
                        ctx.moveTo(j * scale, i * scale);
                        ctx.lineTo(j * scale, i * scale + scale);
                        ctx.stroke();
                    }
                    if (map[i][j + 1] !== 1) {
                        ctx.beginPath();
                        ctx.moveTo(j * scale + scale, i * scale);
                        ctx.lineTo(j * scale + scale, i * scale + scale);
                        ctx.stroke();
                    }
                    ctx.beginPath();
                }
            }
        }
    };
    const drawCharacter = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(
            pos.x + scale / 2,
            pos.y + scale / 2,
            scale / 2,
            0,
            2 * Math.PI
        );
        ctx.stroke();
    };
    const moveCharacter = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        switch (e.keyCode) {
            // right
            case 39:
                if (pos.x + scale < canvas.width) {
                    setPos((prev) => ({
                        ...prev,
                        x: pos.x + scale,
                    }));
                }
                break;
            // Left
            case 37:
                if (pos.x - scale >= 0) {
                    setPos((prev) => ({
                        ...prev,
                        x: pos.x - scale,
                    }));
                }
                break;
            // Up
            case 38:
                if (pos.y - scale >= 0) {
                    setPos((prev) => ({
                        ...prev,
                        y: pos.y - scale,
                    }));
                }
                break;
            // Down
            case 40:
                if (pos.y + scale < canvas.height) {
                    setPos((prev) => ({
                        ...prev,
                        y: pos.y + scale,
                    }));
                }
                break;
            case 16:
                ctx.fillRect(pos.x, pos.y, scale, scale);
                break;
        }
    };

    const [dropBombData, setBombData] = useState({});
    const dropBomb = (e) => {};
    const drawBomb = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    };
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
        </div>
    );
}

export default App;
