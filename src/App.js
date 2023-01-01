import { useState, useRef, useEffect } from "react";
import {
    clearCanvas,
    drawMap,
    drawCharacter,
    drawBomb,
} from "./utils/Drawing";
import { eventCharacter } from "./utils/Event";
// import right_png from "./assets/image/right.png";
// import bomb_png from "./assets/image/bomb.png";

function App() {
    const canvasRef = useRef(null);
    const [pos, setPos] = useState(0);

    // const [mapData, setMapData] = useState({
    //     map: [],
    //     xlength: 0,
    //     ylength: 0,
    // });
    // useEffect(() => {
    //     fetch("map.json")
    //         .then((res) => res.json())
    //         .then((data) =>
    //             setMapData((prev) => ({ ...prev, ...data }))
    //         );
    // }, []);

    const [dropBombData, setBombData] = useState([]);

    // useEffect(() => {
    //     let explosion = setInterval(() => {
    //         console.log(dropBombData);
    //         setBombData([
    //             ...dropBombData.filter((acc) => {
    //                 console.log(Date.now());
    //                 return Date.now() - acc.time <= 4000;
    //             }),
    //         ]);
    //     }, 1000);
    //     return () => {
    //         clearInterval(explosion);
    //     };
    // });

    const draw = (canvas, ctx) => {
        clearCanvas(canvas, ctx);
        drawMap(canvas, ctx);
        drawCharacter(canvas, ctx, pos);
        drawBomb(canvas, ctx, pos, dropBombData);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const eventChar = (e) =>
            eventCharacter(pos, setPos, dropBombData, setBombData, e);
        document.addEventListener("keydown", eventChar);
        draw(canvas, ctx);
        return () => {
            document.removeEventListener("keydown", eventChar);
        };
    }, [pos, dropBombData]);
    return (
        <div>
            <canvas ref={canvasRef} width={900} height={600} />
        </div>
    );
}

export default App;
