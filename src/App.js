import { useState, useRef, useEffect } from 'react';

function App() {
    const canvasRef = useRef(null);
    const [pos, setPos] = useState({
        x: 0,
        y: 0,
    });
    const movScale = 20;
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    const drawMap = () => {
        // const mapData = await (await fetch('map.json')).json();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#f00';
        for (let i = 0; i <= canvas.height / 20; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 20);
            ctx.lineTo(canvas.width, i * 20);
            ctx.stroke();
        }
        for (let i = 0; i <= canvas.width / 20; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 20, 0);
            ctx.lineTo(i * 20, canvas.height);
            ctx.stroke();
        }
        ctx.strokeStyle = '#000';
    };
    const drawCharacter = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        clearCanvas();
        drawMap();
        ctx.beginPath();
        ctx.arc(pos.x+10, pos.y+10, 10, 0, 2 * Math.PI);
        ctx.stroke();
    };
    const moveCharacter = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        switch (e.keyCode) {
            // right
            case 39:
                setPos((prev) => ({
                    ...prev,
                    x: pos.x + movScale,
                }));
                break;
            // Left
            case 37:
                setPos((prev) => ({
                    ...prev,
                    x: pos.x - movScale,
                }));
                break;
            // Up
            case 38:
                setPos((prev) => ({
                    ...prev,
                    y: pos.y - movScale,
                }));
                break;
            // Down
            case 40:
                setPos((prev) => ({
                    ...prev,
                    y: pos.y + movScale,
                }));
                break;
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', moveCharacter);
        drawCharacter();
        return () => {
            document.removeEventListener('keydown', moveCharacter);
        };
    }, [pos]);
    return (
        <div>
            <canvas ref={canvasRef} width={1000} height={600} />
        </div>
    );
}

export default App;
