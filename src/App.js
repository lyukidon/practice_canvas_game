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
    const drawMap = () => {
        // const mapData = await (await fetch('map.json')).json();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
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
    };
    const drawCharacter = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        clearCanvas();
        drawMap();
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
        }
        console.log(pos)
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
            <canvas ref={canvasRef} width={900} height={600} />
        </div>
    );
}

export default App;
