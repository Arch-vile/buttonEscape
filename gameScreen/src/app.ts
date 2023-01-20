function drawMaze(maze) {
    // Get the canvas element and its context
    var canvas = document.getElementById("mazeCanvas");
    var ctx = canvas.getContext("2d");

    // Set the background color of the canvas to white
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Iterate through the maze array and draw a black cube for each "#" character
    for (var row = 0; row < maze.length; row++) {
        for (var col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === "#") {
                // Calculate the x,y coordinates of the top-left corner of the cube
                var x = col * 10; // 10 is the width of the cube
                var y = row * 10; // 10 is the height of the cube

                // Draw the cube
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, 10, 10);
            }
        }
    }
    ctx.strokeStyle = "gray";

    // Iterate through the maze array again and draw a grid line for each cell
    for (var row = 0; row <= maze.length; row++) {
        // Draw a horizontal line
        var y = row * 10;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(maze[0].length * 10, y);
        ctx.stroke();
    }

    for (var col = 0; col <= maze[0].length; col++) {
        // Draw a vertical line
        var x = col * 10;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, maze.length * 10);
        ctx.stroke();
    }
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
