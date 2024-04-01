const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
var cors = require("cors");
const router = require('./routes/Router.js');
const app = express();
const port = 3011;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// app.use('/', (req, res) => {
//     res.status(StatusCodes.NOT_FOUND).json({ status: false, message: 'Sorry, Endpoint does not exist!' });
// });