import { useState, useRef, useEffect } from "react";
import { useInterval } from "react-use";
import GameRenderer from "./utils/GameRenderer";
import Timer from "./utils/Timer";
import { eventCharacter } from "./utils/Event";

import MapCanvas from "./components/MapCanvas";
import CharacterCanvas from "./components/CharacterCanvas";

function App() {
    const [time, setTime] = useState(3000);
    useInterval(() => {
        setTime((prev) => prev - 1);
    }, 1000);

    return (
        <div>
            <MapCanvas />
            <CharacterCanvas />
            <Timer time={time} />
        </div>
    );
}

export default App;
