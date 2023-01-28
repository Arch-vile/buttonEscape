import http from 'http';

const server = http.createServer((req, res) => {
    if (req.url === '/events') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        // Send an event every second
        setInterval(() => {
            res.write(`data: ${new Date().toString()}\n\n`);
        }, 1000);

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
