
interface PlayerStatus {
    direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    x: number;
    y: number;
}

interface GFX {
    canvas:HTMLCanvasElement;
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
    const {ctx,canvas} = gfx;

    for (let i = 0; i <= maze.length; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 10, 0);
        ctx.lineTo(i * 10, canvas.height);
        ctx.stroke();
    }
    for (let j = 0; j <= maze[0].length; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * 10);
        ctx.lineTo(canvas.width, j * 10);
        ctx.stroke();
    }
}

function drawMaze(maze: string[][], gfx: GFX) {
    const {ctx,canvas} = gfx;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === "#") {
                ctx.fillRect(i * 10, j * 10, 10, 10);
            }
        }
    }
    drawGridlines(maze,gfx);
}


function drawPlayer(x: number, y: number, gfx: GFX) {
    const {ctx} = gfx;

        var direction = 'UP'; // direction the player is facing

        // Draw the player based on the direction they are facing
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(x+5, y+5, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "white";
        if (direction === "UP") {
            ctx.beginPath();
            ctx.arc(x+5, y+3, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
        else if (direction === "DOWN") {
            ctx.beginPath();
            ctx.arc(x+5, y+7, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
        else if (direction === "LEFT") {
            ctx.beginPath();
            ctx.arc(x+3, y+5, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
        else if (direction === "RIGHT") {
            ctx.beginPath();
            ctx.arc(x+7, y+5, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
}


// function animateOnePlayer(playerHistory: PlayerStatus[], gfx: GFX) {
//     console.log('animating player')
//     const {ctx, canvas} = gfx;
//     let { direction, x, y } = playerHistory[0];
//     x *= 10;
//     y *= 10;
//     let i = 1;
//     let interval = setInterval(() => {
//         const pos = playerHistory[i];
//         const newX = pos.x * 10;
//         const newY = pos.y * 10;
//         if (newX > x) {
//             x += 1;
//         } else if (newX < x) {
//             x -= 1;
//         } else if (newY > y) {
//             y += 1;
//         } else if (newY < y) {
//             y -= 1;
//         }
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         drawPlayer({x:x/10,y:y/10, direction: direction},gfx);
//         if(x === newX && y === newY) {
//             clearInterval(interval);
//             i++;
//             if(i< playerHistory.length) animateOnePlayer(playerHistory.slice(i),gfx);
//         }
//     }, 10);
// }

const FPS = 30;
const CELL_SIZE = 10;
const ANIMATION_DURATION = 1;
function animatePlayers(playerHistory: PlayerStatus[][], gfx: GFX) {
    let frame = 0;
    let playersFrame = playerHistory.map(p => 0);

    const intervalId = setInterval(() => {
        // clear canvas
        gfx.ctx.clearRect(0, 0, gfx.canvas.width, gfx.canvas.height);
        // draw players
        for (let i=0; i < playerHistory.length; i++) {
            const player = playerHistory[i];
            const currentPosition = player[playersFrame[i]];
            const nextPosition = player[playersFrame[i] + 1];
            if (!nextPosition) {
                clearInterval(intervalId);
                break;
            }

            // calculate the distance between current and next position
            const distance = Math.sqrt(Math.pow(nextPosition.x - currentPosition.x, 2) + Math.pow(nextPosition.y - currentPosition.y, 2));
            // calculate the number of frames needed for the animation
            const frames = Math.ceil(ANIMATION_DURATION * FPS / (distance * CELL_SIZE));
            // calculate the player's current position in pixels
            const x = currentPosition.x * CELL_SIZE + (nextPosition.x - currentPosition.x) * CELL_SIZE * frame / frames;
            const y = currentPosition.y * CELL_SIZE + (nextPosition.y - currentPosition.y) * CELL_SIZE * frame / frames;
            drawPlayer(x, y, gfx);
            if (frame === frames) {
                playersFrame[i]++;
                frame = 0;
            }
        }
        frame++;
    }, 1000/FPS);
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

drawMaze(maze, canvases.maze);
var playerData: PlayerStatus[][] = [
    [
        {direction: "UP", x: 3, y: 5},
        {direction: "UP", x: 3, y: 6},
        {direction: "UP", x: 3, y: 7},
        {direction: "UP", x: 3, y: 8}],
    // [{direction: "LEFT", x: 1, y: 1},{direction: "LEFT", x: 2, y: 1}]
];

animatePlayers(playerData, canvases.players, 10, 10);
}

run();
