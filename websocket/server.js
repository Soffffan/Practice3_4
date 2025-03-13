const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

let clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('message', (message) => {
        const text = message.toString();
        console.log('Получено сообщение:', text);

        // Отправляем всем клиентам
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(text);
            }
        });
    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

console.log('WebSocket сервер запущен на порту 4000');