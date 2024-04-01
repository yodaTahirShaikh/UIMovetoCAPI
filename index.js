const express = require("express");
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fs = require('fs');

const router = require('./routes/Router.js');

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 3011;

const resultdirectory = 'result';
const uploaddirectory = 'uploads';

if (!fs.existsSync(resultdirectory)) {
    fs.mkdirSync(resultdirectory);
}

if (!fs.existsSync(uploaddirectory)) {
    fs.mkdirSync(uploaddirectory);
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

io.on('connection', (socket) => {
    console.log('a user connected');

    // Example: Sending a message to the client on connection
    socket.emit('message', 'Welcome to the server!');
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// app.use('/', (req, res) => {
//     res.status(StatusCodes.NOT_FOUND).json({ status: false, message: 'Sorry, Endpoint does not exist!' });
// });
