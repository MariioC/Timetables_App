const SocketIO = require('socket.io');

class Socket {

    constructor(server) {
        this.io = SocketIO(server, {
            cors: {
              origin: "*:*",
              credentials: true,
            },
            allowEIO3: true
        });
    }

    start() {
        this.io.on('connection', (socket) => {
            console.log('Client conected');
        });
    }

    turnTake(turn) {
        this.io.sockets.emit('turns:take', turn);
    }
    
    turnDelete(turn) {
        this.io.sockets.emit('turns:delete', turn);
    }
}

module.exports = Socket;