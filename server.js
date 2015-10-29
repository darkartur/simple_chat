var StaticServer = require('node-static').Server,
    http = require('http'),
    WebSocketServer = require('ws'),
    parseQS = require('querystring').parse;

var static_server = new StaticServer();

var messages = [];

// подключенные клиенты
var clients = {},
    next_id = 0;

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
    port: 8081
});

function sendMessages(client_id, messages) {
    clients[client_id].send(JSON.stringify(messages));
}

webSocketServer.on('connection', function(ws) {
    var client_id = next_id++;
    clients[client_id] = ws;

    if (messages.length) {
        sendMessages(client_id, messages)
    }

    ws.on('message', (data) => {
        var message = JSON.parse(data);
        messages.push(message);
        Object.keys(clients).forEach((client_id) => sendMessages(client_id, [message]));
    });

    ws.on('close', function() {
        delete clients[client_id];
    });
});


http.createServer(function (request, response) {
    request.addListener('end', function () {
        static_server.serve(request, response);
    }).resume();
}).listen(8080);



