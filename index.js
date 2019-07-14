var express = require('express');



var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));




app.get('/', function(req, res, next) {
    res.render('home.ejs');
});


var port = 3000;
var server = require('http').Server(app);
var socketIo = require('socket.io')(server);
socketIo.on("connection", function(socket) {
    console.log('Co nguoi ket noi ... ', socket.id);
    // socket.on("disconnect", function() {
    //     console.log(socket.id, 'ngat ket noi');
    // });
    // socket.on('thisIsClient1', function(data) {
    //     console.log(data);
    //     //socketIo.sockets.emit('sendData', data + ' this is send data');// toan server nhan data
    //     //socket.emit('sendData', data + ' chi minh ban ...');// chi minh ma thoi
    //     socket.broadcast.emit('sendData', data + ' ngoai tru minh ...')// ngoai tru minh
    // });
    socket.on('req', function(data) {
        socketIo.sockets.emit('res', data);
    });
});




server.listen(port, function() {
    console.log('Server listening..., port: ' + port);
});