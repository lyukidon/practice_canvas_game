import React from "react";

const styles = {
    border: "1px solid black",
};

function MapCanvas() {
    return <canvas style={styles} width={900} height={600} />;
}

export default MapCanvas;