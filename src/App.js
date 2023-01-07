import { useState, useRef, useEffect } from "react";
import { useInterval } from "react-use";
import GameRenderer from "./utils/GameRenderer";
import Timer from "./utils/Timer";
import { eventCharacter } from "./utils/Event";

function App() {
    const [time, setTime] = useState(300);
    const timeRef = useRef(time);

    const canvasRef = useRef(null);
    const [pos, setPos] = useState(0);
    const [dropBombData, setBombData] = useState([]);

    useInterval(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (time > 0) {
            setTime((prev) => prev - 1);
            if (dropBombData.length !== 0) {
                setBombData([
                    // ...dropBombData.filter((data) => {
                    //     return data.time - time < 3;
                    // }),
                    ...dropBombData.reduce((save, data) => {
                        console.log(dropBombData)
                        const bombPos = data.pos;
                        const xlength = 15;
                        const frameRate = 60;
                        const xPos = bombPos % xlength;
                        const yPos = parseInt(bombPos / xlength);
                        if (data.time - time < 3) {
                            save.push(data);
                        } else if (data.time - time == 3) {
                            ctx.fillRect(
                                (xPos - 1) * frameRate,
                                yPos * frameRate,
                                frameRate,
                                frameRate
                            );
                            ctx.fillRect(
                                (xPos + 1) * frameRate,
                                yPos * frameRate,
                                frameRate,
                                frameRate
                            );
                            ctx.fillRect(
                                xPos * frameRate,
                                (yPos - 1) * frameRate,
                                frameRate,
                                frameRate
                            );
                            ctx.fillRect(
                                xPos * frameRate,
                                (yPos + 1) * frameRate,
                                frameRate,
                                frameRate
                            );
                        } else if (data.time - time == 3) {
                            ctx.fillRect(
                                (xPos - 2) * frameRate,
                                yPos * frameRate,
                                frameRate,
                                frameRate
                            );
                            ctx.fillRect(
                                (xPos + 2) * frameRate,
                                yPos * frameRate,
                                frameRate,
                                frameRate
                            );
                            ctx.fillRect(
                                xPos * frameRate,
                                (yPos - 2) * frameRate,
                                frameRate,
                                frameRate
                            );
                            ctx.fillRect(
                                xPos * frameRate,
                                (yPos + 2) * frameRate,
                                frameRate,
                                frameRate
                            );

                        }
                        return save;
                    }, []),
                ]);
            }
        }
    }, 1000);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        GameRenderer(canvas, ctx, pos, dropBombData);

        const eventChar = (evt) =>
            eventCharacter(pos, setPos, dropBombData, setBombData, time, evt);
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
                    {parseInt(time / 60)} :{" "}
                    {time % 60 < 10 ? "0" + (time % 60) : time % 60}
                </div>
            </div>
        </div>
    );
}

export default App;
