import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "react-use";

import {frameRate} from '../GameData'
import CharacterRenderer from "../utils/CharacterRenderer";

const styles = {
    border: "1px solid black",
    position: "fixed",
    left: "8px",
    border: "1px solid black",
};

function CharacterCanvas() {
    const canvasRef = useRef(null);
    const [round, setRound] = useState(0);
    const characterRenderer = new CharacterRenderer();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        characterRenderer.init(canvas, ctx);
        characterRenderer.characterRenderer();
        const moveCharacter = (e) => characterRenderer.moveCharacter(e);
        document.addEventListener("keydown", moveCharacter);

        return () => {
            document.removeEventListener("keydown", moveCharacter);
        };
    }, []);

    useInterval(() => {
        characterRenderer.characterRenderer()
    }, frameRate);

    return <canvas style={styles} ref={canvasRef} width={900} height={600} />;
}

export default CharacterCanvas = React.memo(CharacterCanvas);
