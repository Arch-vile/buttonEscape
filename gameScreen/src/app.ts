const FPS = 30;
const CELL_SIZE = 20;
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


function drawPlayer(pos: Position, gfx: GFX) {
    const {ctx} = gfx;
    const {x, y} = pos;

    var direction = 'UP'; // direction the player is facing

    // Draw the player based on the direction they are facing
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x + 5, y + 5, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    if (direction === "UP") {
        ctx.beginPath();
        ctx.arc(x + 5, y + 3, 1, 0, 2 * Math.PI);
        ctx.fill();
    } else if (direction === "DOWN") {
        ctx.beginPath();
        ctx.arc(x + 5, y + 7, 1, 0, 2 * Math.PI);
        ctx.fill();
    } else if (direction === "LEFT") {
        ctx.beginPath();
        ctx.arc(x + 3, y + 5, 1, 0, 2 * Math.PI);
        ctx.fill();
    } else if (direction === "RIGHT") {
        ctx.beginPath();
        ctx.arc(x + 7, y + 5, 1, 0, 2 * Math.PI);
        ctx.fill();
    }
}


interface Position {
    x: number;
    y: number;
}

function positionAt(waypoints: Position[], timePassed: number): Position {
    let totalTime = waypoints.length - 1;
    let percentage = timePassed / 100;
    let currentIndex = Math.floor(percentage * totalTime);
    let currentPosition = waypoints[currentIndex];
    let nextPosition = waypoints[currentIndex + 1];

    let xDiff = nextPosition.x - currentPosition.x;
    let yDiff = nextPosition.y - currentPosition.y;

    let x = currentPosition.x + (xDiff * (percentage * totalTime - currentIndex));
    let y = currentPosition.y + (yDiff * (percentage * totalTime - currentIndex));

    return {x, y};
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

    var playerData: PlayerStatus[][] = [
        [
            {direction: "UP", x: 3, y: 5},
            {direction: "UP", x: 3, y: 6},
            {direction: "UP", x: 3, y: 7},
            {direction: "UP", x: 3, y: 8}
        ],
        [
            {direction: "LEFT", x: 0, y: 0},
            {direction: "LEFT", x: 0, y: 1}
        ]
    ];

    const drawMazez = () => {
        drawMaze(maze, canvases.maze);
        clear(canvases.players);
    }

    const drawPlayerF = (pos: Position) => {
        drawPlayer(pos, canvases.players)
    }

    const route1 = [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 3, y: 1}, {x: 3, y: 2}];
    const route2 = [{y: 1, x: 1}, {y: 2, x: 1}, {y: 3, x: 1}, {y: 3, x: 1}, {y: 3, x: 2}];
    const path1 = route1.map(it => ({x: it.x * CELL_SIZE, y: it.y * CELL_SIZE}));
    const path2 = route2.map(it => ({x: it.x * CELL_SIZE, y: it.y * CELL_SIZE}));
    drawScreen([{path: path1},{path: path2}], drawMazez, drawPlayerF)
}

interface PlayerPath {
    path: Position[]
}

function drawScreen(players: PlayerPath[], drawMaze: () => void, drawPlayer: (pos: Position) => void) {

    const loop = (timePassed: number) => {
       if(timePassed < 100) {
           drawMaze();
           for(const player of players) {
               drawPlayer(positionAt(player.path, timePassed));
           }
           setTimeout(() => loop(timePassed+1), 10);
       }
    }

    loop(0);

}

run();
