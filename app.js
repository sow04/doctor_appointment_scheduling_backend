var express = require('express');
const { port } = require('./config/config');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});



console.log(`Your port is ${port}`);
