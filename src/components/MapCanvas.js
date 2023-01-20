import React, { useState, useEffect, useRef} from "react";
import GameRenderer from "../utils/GameRenderer";

const styles = {
    border: "1px solid black",
};

function MapCanvas({round}) {
    const canvasRef = useRef(null);
    const gameRenderer = new GameRenderer();
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        gameRenderer.init(canvas, ctx);
        gameRenderer.mapRenderer(round)
    }, []);
    return <canvas ref={canvasRef} style={styles} width={900} height={600} />;
}

export default MapCanvas = React.memo(MapCanvas);
