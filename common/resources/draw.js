// Assume the maze is stored in a 2D array called "maze"
// Define the maze as a 2D array
var maze = [
    ["#", "#", "#", "#", "#", "#"],
    ["#", ".", ".", ".", "#", "#"],
    ["#", ".", "#", ".", ".", "#"],
    ["#", ".", "#", "#", ".", "#"],
    ["#", ".", ".", ".", ".", "#"],
    ["#", "#", "#", "#", "#", "#"]
];

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

// Set the color of the grid lines to gray
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
