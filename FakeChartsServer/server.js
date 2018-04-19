var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.env.PORT || 8080;
var throttle = process.env.THROTTLE || 0;
connect()
    .use(function(request, response, next){
        setTimeout(function() {
            next();
        }, throttle);
    })
    .use(serveStatic(__dirname + '/public')).listen(port, function () {
        console.log('Server running on ', port, 'with throttle', throttle);
    });

// To set port on windows (PowerShell) and run server just:
// $env:PORT=8811; node .\server.js