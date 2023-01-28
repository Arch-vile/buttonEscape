import playerSpriteImg from "./character.png"

const FPS = 30;
const CELL_SIZE = 40;
const ANIMATION_DURATION = 500; // in milliseconds

interface PlayerStatus {
    direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    x: number;
    y: number;
}

interface GFX {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

function createCanvases() {
    return {
        maze: createCanvas('maze'),
        players: createCanvas('players'),
    }
}

function createCanvas(name: string): GFX {
    const canvas = document.getElementById(name) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    return {canvas, ctx}
}

function drawGridlines(maze: string[][], gfx: GFX) {
    const {ctx, canvas} = gfx;

    for (let i = 0; i <= maze.length; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
    }
    for (let j = 0; j <= maze[0].length; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * CELL_SIZE);
        ctx.lineTo(canvas.width, j * CELL_SIZE);
        ctx.stroke();
    }
}

function clear(gfx: GFX) {
    gfx.ctx.fillStyle = "white";
    gfx.ctx.clearRect(0, 0, gfx.canvas.width, gfx.canvas.height);
}

function drawMaze(maze: string[][], gfx: GFX) {
    const {ctx} = gfx;
    ctx.fillStyle = "black";
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === "#") {
                ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
    drawGridlines(maze, gfx);
}

let playerSprite = new Image();
playerSprite.src = playerSpriteImg;

function drawPlayer(pos: Position, facing: number, gfx: GFX) {
    const context = gfx.ctx;
    // context.save();

    // context.translate(pos.x, pos.y);
    // context.rotate(facing * Math.PI / 180);

    const spriteWidth = 255;
    const spriteHeight = 255;

    const spriteX = 0;
    const spriteY = 0;

    context.drawImage(playerSprite, spriteX, spriteY, spriteWidth, spriteHeight,
        pos.x, pos.y, CELL_SIZE, CELL_SIZE);

    // context.restore();
}


interface Position {
    x: number;
    y: number;
}

function positionAt(waypoints: Position[], timePassed: number): Position {
    if (timePassed > 100) {
        throw Error(`Can't go past 100, got ${timePassed}`)
    }

    let totalTime = waypoints.length - 1;
    let percentage = timePassed / 100;
    let currentIndex = Math.floor(percentage * totalTime);

    let currentPosition = waypoints[currentIndex];
    if (currentIndex === totalTime) {
        return currentPosition;
    }

    let nextPosition = waypoints[currentIndex + 1];

    let xDiff = nextPosition.x - currentPosition.x;
    let yDiff = nextPosition.y - currentPosition.y;

    let x = currentPosition.x + (xDiff * (percentage * totalTime - currentIndex));
    let y = currentPosition.y + (yDiff * (percentage * totalTime - currentIndex));

    return {x, y};
}


function routeToPath(route: PlayerStatus[]): PlayerPath {
    return {
        path: route.map(it => ({x: it.x * CELL_SIZE, y: it.y * CELL_SIZE}))
    };
}

function playerPathsFromServerData(playerDataFromServer: PlayerStatus[][]) {
    if (new Set(playerDataFromServer.map(it => it.length)).size !== 1)
        throw Error('All players should have the same amount positions. As each position represents a position in time.');

    return playerDataFromServer.map(route => routeToPath(route));
}

function run() {
// Define the maze as a 2D array
    var maze = [
        ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
        ["#", ".", ".", ".", "#", ".", ".", ".", "#"],
        ["#", ".", "#", ".", "#", ".", "#", ".", "#"],
        ["#", ".", ".", ".", ".", ".", "#", ".", "#"],
        ["#", "#", "#", "#", ".", "#", "#", ".", "#"],
        ["#", ".", ".", ".", ".", ".", ".", ".", "#"],
        ["#", ".", "#", "#", "#", ".", "#", "#", "#"],
        ["#", ".", ".", ".", "#", ".", ".", ".", "#"],
        ["#", "#", "#", "#", "#", "#", "#", "#", "#"]
    ];

    const canvases = createCanvases();

    const drawMazez = () => {
        drawMaze(maze, canvases.maze);
        clear(canvases.players);
    }

    const drawPlayerF = (pos: Position) => {
        drawPlayer(pos, 90, canvases.players)
    }


    var playerDataFromServer: PlayerStatus[][] = [
        [
            {direction: "DOWN", x: 3, y: 5},
            {direction: "DOWN", x: 3, y: 6},
            {direction: "DOWN", x: 3, y: 7},
            {direction: "RIGHT", x: 3, y: 7},
            {direction: "RIGHT", x: 4, y: 7},
        ],
        [
            {direction: "LEFT", x: 6, y: 3},
            {direction: "LEFT", x: 5, y: 3},
            {direction: "LEFT", x: 5, y: 3},
            {direction: "LEFT", x: 5, y: 3},
            {direction: "LEFT", x: 5, y: 3},
        ]
    ];

    const playerPaths = playerPathsFromServerData(playerDataFromServer)
    drawScreen(playerPaths, drawMazez, drawPlayerF)
}

interface PlayerPath {
    path: Position[]
}

function drawScreen(players: PlayerPath[], drawMaze: () => void, drawPlayer: (pos: Position) => void) {

    const loop = (timePassed: number) => {
        if (timePassed > 100) timePassed = 100
        drawMaze();
        for (const player of players) {
            drawPlayer(positionAt(player.path, timePassed));
        }

        if (timePassed < 100)
            setTimeout(() => loop(timePassed + 1), 10);
    }

    loop(0);
}

playerSprite.onload = () => run();
