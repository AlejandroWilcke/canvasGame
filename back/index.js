const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const indexRouter = require('./routes/routes.js');

app.use(express.static(path.join(__dirname, '/../front/public')));

app.use('/', indexRouter);

var server = app.listen(port, function(){
  console.log(`Listening at ${port}`);
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  io.emit('bienvenido', {test: 'hola'});
});
