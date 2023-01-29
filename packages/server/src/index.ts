import EventEmitter from 'events';
import http from 'http';
import {createGame} from "./Game";

export interface GameEvent {
    type: string;
    data: object;
}

function gameEventToSSE(event: GameEvent): string {
    const eventType = `event: ${event.type}`
    const dataPart = `data: ${JSON.stringify(event.data)}`
    return `${eventType}\n${dataPart}\n\n`
}

const server = http.createServer((req, res) => {
    if (req.url === '/events') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
           "Access-Control-Allow-Origin":  "*",
           "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        });

        const emitter = new EventEmitter()
        const sendData = (data: GameEvent) => emitter.emit('sendData',data)
        createGame(sendData)

        emitter.on('sendData', (data) => {
            res.write(gameEventToSSE(data))
        });

        // Close the connection when the client closes it
        req.on('close', () => {
            res.end();
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(3000);
console.log('Server-Sent Events running on http://localhost:3000/events');
