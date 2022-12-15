import { useState, useRef, useEffect } from 'react';

function App() {
    const canvasRef = useRef(null);
    const [pos, setPos] = useState({
        x: 0,
        y: 0,
    });
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    const drawMap = async () => {
        const mapData = await (await fetch('map.json')).json();
    };
    const drawCharacter = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.strokeRect(0, 0, 20, 20);
    };
    const moveCharacter = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        switch (e.keyCode) {
            case 39:
                setPos({
                    ...pos,
                    x: pos.x + 10,
                });
                clearCanvas();
                ctx.strokeRect(pos.x, pos.y, 20, 20);
                break;
            case 37:
                setPos({
                    ...pos,
                    x: pos.x - 10,
                });
                clearCanvas();
                ctx.strokeRect(pos.x, pos.y, 20, 20);
                break;
            case 38:
                setPos({
                    ...pos,
                    y: pos.y - 10,
                });
                clearCanvas();
                ctx.strokeRect(pos.x, pos.y, 20, 20);
                break;
            case 40:
                setPos({
                    ...pos,
                    y: pos.y + 10,
                });
                clearCanvas();
                ctx.strokeRect(pos.x, pos.y, 20, 20);
                break;
        }
        // right
        // Left

        // Up
        // Down
    };
    useEffect(() => {
        clearCanvas();
        drawMap();
        drawCharacter();
    }, []);
    useEffect(() => {
        document.addEventListener('keydown', moveCharacter);
        return () => {
            document.removeEventListener('keydown', moveCharacter);
        };
    }, [pos]);
    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default App;
