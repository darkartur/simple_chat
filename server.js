var StaticServer = require('node-static').Server,
    http = require('http'),
    parseQS = require('querystring').parse;

var static_server = new StaticServer();

var messages = [];

var map = {

    '/messages': {
        /**
         *
         * @param {http.IncomingMessage} request
         * @param response
         * @constructor
         */
        "POST": function(data) {
            messages.push(data);
            return {
                code: 302,
                headers: {
                    'Location': '/'
                }
            };
        },

        "GET": function() {
            return {
                code: 200,
                body: messages
            }
        }
    }

};


http.createServer(function (request, response) {
    var body = '';

    request.on('data', function (chunk) {
        body += chunk;
    });

    request.addListener('end', function () {
        var api = map[request.url],
            result;

        if (api) {
            result = api[request.method](parseQS(body));
            response.writeHead(result.code, result.headers);
            if (result.body) {
                response.write(JSON.stringify(result.body));
            }
            response.end();
        } else {
            static_server.serve(request, response);
        }

    });
}).listen(8080);



