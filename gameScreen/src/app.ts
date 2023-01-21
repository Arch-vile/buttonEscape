
interface Player {
    direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    x: number;
    y: number;
}

interface GFX {
    canvas:HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
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


function drawPlayer(playerData: Player[], gfx: GFX) {
    const {ctx,canvas} = gfx;

    // Iterate through the player data array
    for (var i = 0; i < playerData.length; i++) {
        var player = playerData[i];
        var x = player.x * 10; // x-coordinate of the player
        var y = player.y * 10; // y-coordinate of the player
        var direction = player.direction; // direction the player is facing

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
}

function animateOnePlayer(playerHistory: Player[], gfx: GFX) {
    const {ctx, canvas} = gfx;
    let { direction, x, y } = playerHistory[0];
    x *= 10;
    y *= 10;
    let i = 1;
    let interval = setInterval(() => {
        const pos = playerHistory[i];
        const newX = pos.x * 10;
        const newY = pos.y * 10;
        if (newX > x) {
            x += 1;
        } else if (newX < x) {
            x -= 1;
        } else if (newY > y) {
            y += 1;
        } else if (newY < y) {
            y -= 1;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze(maze,gfx);
        drawPlayer({x:x/10,y:y/10, direction: direction},gfx);
        if(x === newX && y === newY) {
            clearInterval(interval);
            i++;
            if(i< playerHistory.length) animateOnePlayer(playerHistory.slice(i),gfx);
        }
    }, 10);
}


function animatePlayer(playerData) {
    for (var i = 0; i < playerData.length; i++) {
        animateOnePlayer(playerData[i]);
    }
}
