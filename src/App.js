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
        clearCanvas();
        ctx.strokeRect(pos.x, pos.y, 20, 20);
    };
    const moveCharacter = (e) => {
        console.log('key')
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        switch (e.keyCode) {
            // right
            case 39:
                setPos((prev) => ({
                    ...prev,
                    x: pos.x + 10,
                }));
                break;
            // Left
            case 37:
                setPos((prev) => ({
                    ...prev,
                    x: pos.x - 10,
                }));
                break;
            // Up
            case 38:
                setPos((prev) => ({
                    ...prev,
                    y: pos.y - 10,
                }));
                break;
            // Down
            case 40:
                setPos((prev) => ({
                    ...prev,
                    y: pos.y + 10,
                }));
                break;
        }
    };
    useEffect(() => {
        clearCanvas();
        drawMap();
        drawCharacter();
    }, []);
    useEffect(() => {
        console.log('useEffect-pos');
        document.addEventListener('keydown', moveCharacter);
        drawCharacter();
        return () => {
            document.removeEventListener('keydown', moveCharacter);
            drawCharacter();
        };
    }, [pos]);
    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default App;
