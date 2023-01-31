import { useState, useRef, useEffect } from "react";
import { useInterval } from "react-use";

import Timer from './components/Timer'
import MapCanvas from "./components/MapCanvas";
import CharacterCanvas from "./components/CharacterCanvas";

function App() {
    const [time, setTime] = useState(3000);
    const [round, setRound] = useState(0)
    useInterval(() => {
        setTime((prev) => prev - 1);
    }, 1000);

    return (
        <div>
            <MapCanvas round = {round} />
            <CharacterCanvas round = {round} />
            <Timer time={time} />
        </div>
    );
}

export default App;
