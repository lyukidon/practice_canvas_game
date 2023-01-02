import { maps, xlength, ylength } from '../GameData';

export const eventCharacter = (
    pos,
    setPos,
    dropBombData,
    setBombData,
    evt
) => {
    const map = maps[0];
    console.log(evt)
    switch (evt.keyCode) {
        // Up
        case 38:
            // prevent moving beyond the map
            if (pos - xlength >= 0) {
                if (map[pos - xlength] !== 1) {
                    setPos((prev) => prev - xlength);
                }
            }
            break;
        // Down
        case 40:
            if (parseInt(pos / xlength) < ylength - 1) {
                if (map[pos + xlength] !== 1) {
                    setPos((prev) => prev + xlength);
                }
            }
            break;
        // Left
        case 37:
            if (pos % xlength !== 0) {
                if (map[pos - 1] !== 1) {
                    setPos((prev) => prev - 1);
                }
            }
            break;
        // right
        case 39:
            if (pos % xlength !== xlength - 1) {
                if (map[pos + 1] !== 1) {
                    setPos((prev) => prev + 1);
                }
            }
            break;
        // shift
        // drop bomb
        case 16:
            setBombData([
                ...dropBombData,
                {
                    pos,
                    time: Date.now(),
                },
            ]);
            break;
    }
};
