import React, { useState, useRef } from "react";

function Timer({time}) {
    return (
        <div>
            <div>Timer</div>
            <div>
                {parseInt(time / 60)} :{" "}
                {time % 60 < 10 ? "0" + (time % 60 | 0) : time % 60 | 0}
            </div>
        </div>
    );
}
