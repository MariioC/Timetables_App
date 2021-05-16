const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.set('port', process.PORT || 3000);

// Configurations
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./routes/appRoutes'));

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port: http://localhost:${app.get('port')}`);
});

// WebSocket
const Socket = require('./socket');
const socketIO = new Socket(server);
global.io = socketIO;
io.start();

// const SocketIO = require('socket.io');
// const io = SocketIO(server, {
//     cors: {
//       origin: "http://localhost:8080",
//       credentials: true,
//     },
//     allowEIO3: true
// });

// io.on('connection', (socket) => {
//     console.log('Client conected');

//     socket.on('message', (data) => {
//         // io.sockets.emit('message', data);
//         socket.broadcast.emit('message', data);
//     });

// });