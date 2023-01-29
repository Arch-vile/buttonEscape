"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const common_1 = require("common/src/common");
(0, common_1.foo)();
const server = http_1.default.createServer((req, res) => {
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
    }
    else {
        res.writeHead(404);
        res.end();
    }
});
server.listen(3000);
console.log('Server-Sent Events running on http://localhost:3000/events');
