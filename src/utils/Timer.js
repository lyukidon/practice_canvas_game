export const timer = (time, setTime, dropBombData, setBombData) => {
    if (time > 0) {
        setTime((prev) => prev - 0.5);
        if (dropBombData.length !== 0) {
            setBombData([
                ...dropBombData.filter((data) => {
                    return data.time - time < 5;
                }),
            ]);
        }
    }
};
