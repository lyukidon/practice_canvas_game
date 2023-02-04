import React, { useEffect, useRef, useState, memo } from "react";
import { useInterval } from "react-use";

import { frameRate } from "../GameData";
import CharacterRenderer from "../utils/CharacterRenderer";

const styles = {
    border: "1px solid black",
    position: "fixed",
    left: "11px",
    border: "1px solid black",
};

function CharacterCanvas({ round }) {
    const canvasRef = useRef(null);
    const characterRenderer = new CharacterRenderer();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        characterRenderer.init(canvas, ctx, round);
        characterRenderer.characterRenderer();
        const moveCharacter = (e) => characterRenderer.moveCharacter(e);
        document.addEventListener("keydown", moveCharacter);

        return () => {
            document.removeEventListener("keydown", moveCharacter);
        };
    }, []);

    useInterval(() => {
        characterRenderer.characterRenderer();
    }, 100);

    return <canvas style={styles} ref={canvasRef} width={900} height={600} />;
}

export default memo(CharacterCanvas);
