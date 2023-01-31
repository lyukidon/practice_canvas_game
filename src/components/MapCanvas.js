import React, { useState, useEffect, useRef} from "react";
import MapRenderer from "../utils/MapRenderer";

const styles = {
    border: "1px solid black",
};

function MapCanvas({round}) {
    const canvasRef = useRef(null);
    const mapRenderer = new MapRenderer();
    useEffect(() => {
        const canvas = canvasRef.current;
        mapRenderer.init(canvas, round);
        mapRenderer.mapRenderer()
    }, []);
    return <canvas ref={canvasRef} style={styles} width={900} height={600} />;
}

export default MapCanvas = React.memo(MapCanvas);
