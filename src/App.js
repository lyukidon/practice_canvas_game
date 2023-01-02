import { useState, useRef, useEffect } from "react";
import GameRenderer from "./utils/GameRenderer";
import { eventCharacter } from "./utils/Event";
// import right_png from "./assets/image/right.png";
// import bomb_png from "./assets/image/bomb.png";

function App() {
    const canvasRef = useRef(null);
    const [pos, setPos] = useState(0);
    const [dropBombData, setBombData] = useState([]);

    useEffect((e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        GameRenderer(canvas, ctx, pos, dropBombData, e);
    }, [pos]);

    return (
        <div>
            <canvas ref={canvasRef} width={900} height={600} />
        </div>
    );
}

export default App;
