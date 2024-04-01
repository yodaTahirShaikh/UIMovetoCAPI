const fs = require('fs');
const socketIO = require('socket.io');

const directory = 'result';

const initializeWebSocketServer = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('getProgress', () => {
            sendProgressData(socket);
        });

        socket.on('getFiles', () => {
            socket.emit('files', getcsvfiles());
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        socket.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
};


const sendProgressData = (socket) => {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
        }
        socket.emit('progress', { progress, eta: 'Calculating...' });
    }, 1000);
};

const getcsvfiles = () => {
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.csv'));
    const fileNames = files.map(file => file.replace('.csv', ''));
    return fileNames;
};

module.exports = { getcsvfiles, initializeWebSocketServer };
