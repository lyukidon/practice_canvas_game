import { useState, useRef, useEffect } from "react";
import GameRenderer from "./utils/GameRenderer";
import { eventCharacter } from "./utils/Event";

function App() {
    const [timer, setTimer] = useState(3);
    const timerRef = useRef(timer);

    const canvasRef = useRef(null);
    const [pos, setPos] = useState(0);
    const [dropBombData, setBombData] = useState([]);

    useEffect(() => {
        let reduceTimer = setInterval(() => {
            timerRef.current--;
            setTimer((prev) => prev-1);
            if (timerRef.current === 0) {
                clearInterval(reduceTimer);
            }
        },1000);
        return ()=>clearInterval(reduceTimer)
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        GameRenderer(canvas, ctx, pos, dropBombData);

        const eventChar = (evt) =>
            eventCharacter(pos, setPos, dropBombData, setBombData, evt);
        document.addEventListener("keydown", eventChar);
        return () => {
            document.removeEventListener("keydown", eventChar);
        };
    }, [pos, dropBombData]);

    return (
        <div>
            <canvas ref={canvasRef} width={900} height={600} />
            <div>
                <div>Timer</div>
                <div>
                    {parseInt(timer / 60)} :{" "}
                    {timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}
                </div>
            </div>
        </div>
    );
}

export default App;
