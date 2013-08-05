var http = require('http');
var express = require('express');
var app = express();
app.use(express.static('demos'));
var server = http.createServer(app);
server.listen(process.env.PORT || 80, function () {
	require('openurl').open('http://localhost:' + server.address().port + '/');
});
