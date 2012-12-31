var express = require('express');
var app = express();
app.use(express.static(__dirname + '/demos'));
app.listen(80, function () {
	require('openurl').open('http://localhost/');
});
