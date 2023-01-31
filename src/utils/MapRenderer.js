import { BUILD_TYPE, SCALE, maps, xlength, keyCodeNum, MOVING_RANGE } from "../GameData";
import { gameResource } from "../GameData";
import bush from "../assets/image/bush.jpg";
import wall from "../assets/image/wall.png";
import wood from "../assets/image/wood.png";
import bomb from "../assets/image/bomb.png";

export default class {
    constructor() {
        this.xPos = 10;
        this.yPos = 10;
    }

    init(canvas, round) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.round = round
    }

    clearCanvas() {
        const { canvas, ctx } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    getStructureResource(structure) {
        const img = new Image();
        switch (structure) {
            case BUILD_TYPE.WALL:
                img.src = wall;
                break;
            case BUILD_TYPE.BUSH:
                img.src = bush;
                break;
            case BUILD_TYPE.WOOD:
                img.src = wood;
                break;
        }
        return img;
    }

    mapRenderer() {
        this.xlength = this.canvas.width / SCALE.BLOCK;
        const { canvas, ctx, round, xlength } = this;
        const map = maps[round];
        for (let i = 0; i < map.length; i++) {
            const x = i % xlength * SCALE.BLOCK;
            const y = ((i / xlength) | 0) * SCALE.BLOCK;
            const img = this.getStructureResource(map[i]);
            img.onload = () => ctx.drawImage(img, x, y, SCALE.BLOCK, SCALE.BLOCK);
        }
    }
}