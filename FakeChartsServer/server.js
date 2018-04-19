var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.env.port || 8080;
connect().use(serveStatic(__dirname + '/public')).listen(port, function(){
    console.log('Server running on ', port);
});

// To set port on windows (PowerShell) and run server just:
// $env:PORT=8811; node .\server.js