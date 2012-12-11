var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.listen(80, function () {
	require('openurl').open('http://localhost/test.html');
});
