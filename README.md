# ButtonEscape

Simple hobby project for multiplayer game

## Executive summary
A simple turnbased co-operative multiplayer game to be played with mobile phones and with a shared screen (for example a smart TV). Each player control their character with the mobile phone interface containing two buttons (thus the name). Players play in a shared maze and try to collect each key to escape the maze before they run out of turns. After which a new level begins.

The catch is that players will blindly preprogram the movement of their character in a given time slot (about 5 seconds) after which all characters move simultaneously accordingly to the program. Pressing the controls do not immediately change the state on the screen, only after the allowed time has elapsed will the actual movement of charactes happen on the shared screen. After that a new round begins with new programming. Players can program as many steps as they want but with the risk of making a mistake and ending up acting horribly wrong.

The amount of turns per level is limited and the levels become increasingly difficult.


![image](https://user-images.githubusercontent.com/2006859/212980838-6fef6465-cee8-4c08-9c4b-611d8dc75760.png)


## Starting a new game
Go to the game's web site on the shared display to get a code. Each player goes to the web site and inserts the code to get to the same game.

## Game features
- Gates that are opened by standing on the similarly colored pad (to increase collaboration).

## UI bare bones
Mobile phone UI will have two buttons:
- One to turn characters facing clockwise 90 degrees
- One to move one step forward

## Ideas for variation
- Events that affect the controls e.g. switches buttons, every N actions buttons are switched....

## Levels
For simplicity there will only be one maze. The increasing difficulty in levels comes from the decreasing amount of allowed number of turns. 

## Architecture
Server keeping the game state and "streaming" to the shared display.

Clients communicate with the server through WebSocket API for two way communication.

Shared screen receives game state from server with Server Side Events for rendering.

![image](https://user-images.githubusercontent.com/2006859/212986366-c09c04be-06d6-4eab-990c-1f06c12c7838.png)



