import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "react-use";

import GameRenderer from "../utils/GameRenderer";
import {frameRate} from '../GameData'

const styles = {
    border: "1px solid black",
    position: "fixed",
    left: "8px",
    border: "1px solid black",
};

function CharacterCanvas() {
    const canvasRef = useRef(null);
    const [round, setRound] = useState(0);
    const gameRenderer = new GameRenderer();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        gameRenderer.init(canvas, ctx);
        gameRenderer.characterRenderer();
        const moveCharacter = (e) => gameRenderer.moveCharacter(e);
        document.addEventListener("keydown", moveCharacter);

        return () => {
            document.removeEventListener("keydown", moveCharacter);
        };
    }, []);

    useInterval(() => {
        gameRenderer.characterRenderer()
    }, frameRate);

    return <canvas style={styles} ref={canvasRef} width={900} height={600} />;
}

export default CharacterCanvas = React.memo(CharacterCanvas);
