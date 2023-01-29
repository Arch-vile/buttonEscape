import {PlayerMovementEvent, PlayerStatus} from "common/src/types";
import {GameEvent} from "./index";

export function createGame(emitter: (event: GameEvent) => void) {

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

        emitter({type: 'playerMovement', data});
        setTimeout(() => loop(), 2000);
    }
     loop();

    return {};
}
