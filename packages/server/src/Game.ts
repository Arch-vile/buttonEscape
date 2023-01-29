import EventEmitter from "events";
import {PlayerMovementEvent, PlayerStatus} from "common/src/types";

export function createGame(emitter: EventEmitter) {

    const loop = () => {

        const data: PlayerMovementEvent = {
            movement: [[
                {direction: "DOWN", x: 3, y: 5},
                {direction: "DOWN", x: 3, y: 6},
                {direction: "DOWN", x: 3, y: 7},
                {direction: "RIGHT", x: 3, y: 7},
                {direction: "RIGHT", x: 4, y: 7},
            ],
                [
                    {direction: "LEFT", x: 6, y: 3},
                    {direction: "LEFT", x: 5, y: 3},
                    {direction: "LEFT", x: 5, y: 3},
                    {direction: "LEFT", x: 5, y: 3},
                    {direction: "LEFT", x: 5, y: 3},
                ]]
        }

        emitter.emit('playerMovement', data);
        setTimeout(() => loop(), 2000);
    }
    loop();

    return {};
}
