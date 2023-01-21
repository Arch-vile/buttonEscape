function drawGridlines(canvas:HTMLCanvasElement,maze: string[][]) {
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 0.5;
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

function drawMaze(maze: string[][]) {
    const canvas = document.getElementById("mazeCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
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
    drawGridlines(canvas,maze);
}


function drawPlayer(playerData) {
    console.log('drawing player',playerData);
    // Get the canvas element and its context
    var canvas = document.getElementById("mazeCanvas");
    var ctx = canvas.getContext("2d");

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

interface Player {
    direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    x: number;
    y: number;
}

function animateOnePlayer(playerHistory: Player[]) {
    const canvas = document.getElementById("mazeCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
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
        drawMaze(maze);
        drawPlayer({x:x/10,y:y/10, direction: direction});
        if(x === newX && y === newY) {
            clearInterval(interval);
            i++;
            if(i< playerHistory.length) animateOnePlayer(playerHistory.slice(i));
        }
    }, 10);
}


function animatePlayer(playerData) {
    for (var i = 0; i < playerData.length; i++) {
        animateOnePlayer(playerData[i]);
    }
}
