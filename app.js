var express = require('express'),
    app     = express(),
    bodyParser = require('body-parser'),
    os = require('os'),
    hostname = os.hostname();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var route = express.Router();

app.use('/', route);

// Start defining routes for our app/microservice

// A route that dumps hostname information from pod
route.get('/', function(req, res) {
    res.send('Hi! I am running on host -> ' + hostname + '\n');
});

// A route used for the readiness probe in openshift
route.get('/ready', function(req, res) {
    res.send('READY\n');
});


// A route used for health check in openshift
route.get('/health', function(req, res) {
    res.send('OK\n');
});


app.listen(port, ip);
console.log('nodejs server running on http://%s:%s', ip, port);

module.exports = app;

