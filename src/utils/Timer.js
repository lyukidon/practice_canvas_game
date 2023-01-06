// export default function Time (time, setTime, timeRef){
//     let reduceTime = setInterval(() => {
//         timeRef.current--;
//         setTime((prev) => prev-1);
//         if (timeRef.current === 0) {
//             clearInterval(reduceTime);
//         }
//     },1000);
// }

export default class Time {
    constructor(time, setTime, timeRef){
        this.time = time;
        this.setTime = setTime;
        this.timeRef = timeRef;
    }

    reduceTime(){
        const time = this.time;
        const setTime = this.setTime;
        const timeRef = this.timeRef
        setInterval(() => {
            this.timeRef.current--;
            setTime((prev) => prev-1);
            if (timeRef.current === 0) {
                clearInterval(this._reduceTime);
            }
        },1000);
    }
}