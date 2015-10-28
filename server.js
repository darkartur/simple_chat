var StaticServer = require('node-static').Server,
    http = require('http');

var static_server = new StaticServer();

http.createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        static_server.serve(request, response);
    }).resume();
}).listen(8080);
