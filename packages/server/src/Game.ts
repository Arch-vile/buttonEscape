import {Direction, PlayerMovementEvent, PlayerStatus} from "common/src/types";
import {GameEvent} from "./index";


const maze = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", ".", ".", ".", "#", ".", ".", ".", "#"],
    ["#", ".", "#", ".", "#", ".", "#", ".", "#"],
    ["#", ".", ".", ".", ".", ".", "#", ".", "#"],
    ["#", "#", "#", ".", ".", "#", "#", ".", "#"],
    ["#", ".", ".", ".", ".", ".", ".", ".", "#"],
    ["#", ".", "#", "#", "#", ".", "#", "#", "#"],
    ["#", ".", ".", ".", "#", ".", ".", ".", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"]
];

export function createGame(emitter: (event: GameEvent) => void) {

    emitter({type: 'maze', data: maze});

    let playerStatus: PlayerStatus[] = [{
        direction: 'RIGHT',
        x: 1,
        y: 1
    }];

    const loop = () => {

        // const data: PlayerMovementEvent = {
        //     movement: [[
        //         {direction: "DOWN", x: 3, y: 5},
        //         {direction: "DOWN", x: 3, y: 6},
        //         {direction: "DOWN", x: 3, y: 7},
        //         {direction: "RIGHT", x: 3, y: 7},
        //         {direction: "RIGHT", x: 4, y: 7},
        //     ],
        //         [
        //             {direction: "LEFT", x: 6, y: 3},
        //             {direction: "LEFT", x: 5, y: 3},
        //             {direction: "LEFT", x: 5, y: 3},
        //             {direction: "LEFT", x: 5, y: 3},
        //             {direction: "LEFT", x: 5, y: 3},
        //         ]]
        // }

        // emitter({type: 'playerMovement', data});

        emitter({
            type: 'playerMovement', data: {
                // TODO: to avoid altering data while in transit we should copy data here?
                movement: [playerStatus]
            }
        });
        playerStatus = [playerStatus[playerStatus.length-1]]
        setTimeout(() => loop(), 2000);
    }
    loop();

    const processPlayerMovement = (direction: Direction) => {
        const lastPosition = playerStatus[playerStatus.length-1]
        const newPosition = {...lastPosition}
        switch (direction) {
            case "DOWN": newPosition.y++;
            case "UP": newPosition.y--;
            case "LEFT": newPosition.x--;
            case "RIGHT": newPosition.x++;
        }
        playerStatus.push(newPosition)
    };


    setInterval(() => processPlayerMovement('RIGHT'), 5000);

    return {
        playerInput: processPlayerMovement
    };
}
