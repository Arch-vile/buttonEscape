
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

function animatePlayers(playerHistory: PlayerStatus[][], gfx: GFX) {
    // Use map to create an array of animation promises for each player
    const animationPromises = playerHistory.map((playerPositions, playerIndex) => {
        return animatePlayer(playerPositions, gfx, playerIndex);
    });

    // Use Promise.all to wait for all animations to finish
    return Promise.all(animationPromises);
}

const ANIMATION_DURATION = 500; // in milliseconds

function animatePlayer(playerPositions: PlayerStatus[], gfx: GFX, playerIndex: number) {
    let currentPosition = playerPositions[0];
    let nextPosition = playerPositions[1];
    let startTime: number|undefined;

    return new Promise((resolve) => {
        let intervalId = setInterval(() => {
            console.log(playerIndex)
            if (!startTime) {
                startTime = Date.now();
            }
            // Clear the canvas
            gfx.ctx.clearRect(0, 0, gfx.canvas.width, gfx.canvas.height);
            // Draw the player at the current position
            const progress = (Date.now() - startTime) / ANIMATION_DURATION;
            drawPlayer(currentPosition.x * 10 + (nextPosition.x - currentPosition.x) * 10 * progress,
                currentPosition.y * 10 + (nextPosition.y - currentPosition.y) * 10 * progress, gfx);
            if (Date.now() - startTime < ANIMATION_DURATION) {
                // Keep animating
            } else {
                // Update the current position and next position
                currentPosition = nextPosition;
                nextPosition = playerPositions[playerPositions.indexOf(currentPosition) + 1];
                startTime = undefined;
                if (nextPosition) {
                } else {
                    // If we've reached the end of the player's positions, clear the interval and resolve the promise
                    clearInterval(intervalId);
                    resolve(1);
                }
            }
        }, 10);
    });
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
        {direction: "UP", x: 3, y: 8}
    ],
     [
         {direction: "LEFT", x: 0, y: 0},
         {direction: "LEFT", x: 0, y: 1}
     ]
];

animatePlayers(playerData, canvases.players);
}

run();
