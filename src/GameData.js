// Default Setup

export const gameScreenWidth = 900;
export const gameScreenHeight = 600;
export const xlength = 15;
export const ylength = 10;
export const frameRate = 60;
export const build = [
    "EMPTY",
    "WALL",
    "BUSH",
    "WOOD",
    "PLAYER1",
    "PLAYER2",
    "BOMB",
];

// 게임 리소스

export const gameResource = {
    EMPTY: "LOCATION",
    WALL: "",
    BUSH: "../assets/image/bush.png",
    PLAYER1: "",
    PLAYER2: "",
    BOMB: "",
};

// prettier-ignore
// 게임 지도

export const maps = [
    [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,
        0,2,2,2,0,0,1,1,1,1,1,3,0,0,0,
        0,1,2,1,0,0,1,0,0,0,0,3,0,0,0,
        0,0,0,3,0,0,1,0,1,0,0,3,0,0,0,
        0,0,0,3,0,0,1,0,1,0,0,3,0,0,0,
        0,0,0,3,0,0,0,0,1,0,0,1,2,1,0,
        0,0,0,3,1,1,1,1,1,0,0,2,2,2,0,
        0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,1,2,1,0,0,1,0,0,0,0,0,0,0,0,
        0,2,2,2,0,0,1,0,0,0,0,0,0,1,0,
        0,1,2,1,0,0,1,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,
        0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,
        0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,
        0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,
        0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ]
];
