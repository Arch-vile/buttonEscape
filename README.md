# ButtonEscape

Simple hobby project for multiplayer game

## Executive summary
A simple co-operative multiplayer game to be played with mobile phones and with a shared screen (for example a smart TV). Each player control their character with the mobile phone interface containing two buttons (thus the name). Players play in a shared maze and try to collect each key to escape the maze before they run out of turns. After which a new level begins.

The catch is that players will preprogram the movement of their character in a given time slot (about 10 seconds) after which all characters move simultaneously accordingly to the program. After that a new round begins with new programming. Players can program as many steps as they want but with the risk of making a mistake and ending up acting horribly wrong.

The amount of turns per level is limited and the levels become increasingly difficult.


## Starting a new game
Go to the game's web site on the shared display to get a code. Each player goes to the web site and inserts the code to get to the same game.

## UI bare bones
Mobile phone UI will have two buttons:
- One to turn characters facing clockwise 90 degrees
- One to move one step forward

## Ideas for variation
- Events that affect the controls e.g. switches buttons, every N actions buttons are switched....

## Architecture
Server keeping the game state and "streaming" to the shared display.
