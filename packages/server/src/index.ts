import EventEmitter from 'events';
import http from 'http';
import {createGame} from "./Game";
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
        createGame(emitter)

        // setInterval(()=>{
        //     res.write('asdfsdf\n\n')
        // },1000);
        emitter.on('playerMovement', (data) => {
            console.log('Sending data');
            const eventType = `event: playerMovement`
            const dataPart = `data: ${JSON.stringify(data)}`
            res.write(`${eventType}\n${dataPart}\n\n`)
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
