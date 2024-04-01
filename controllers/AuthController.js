const axios = require('axios');
const qs = require('qs');
const jwt = require('jsonwebtoken');
const { logger } = require('../helper/loggerhelper');

const loginPage = async (req, res) => {
    let cookies = req.cookies.smacon;
    let decodedToken = jwt.decode(cookies);
    if (cookies && decodedToken.exp > Date.now() / 1000) {
        return res.status(200).sendFile("index.html", { root: './views' });
    }
    return res.status(200).sendFile("login.html", { root: './views' });
};

let url = 'https://whatsapp-internal-support.gupshup.io/support/auth/login';
// let url = 'http://10.80.14.84:8081/support/auth/login';
let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

const logIn = async (req, res) => {
    const { username, password } = req.body;
    let data = qs.stringify({ 'username': username, 'password': password });
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    try {
        let cookies = req.cookies.smacon;
        let decodedToken = jwt.decode(cookies);
        if (!cookies || decodedToken.exp < Date.now() / 1000) {
            logger(`${username} | Login Request`)
            let response = await axios.post(url, data, { headers });
            if (response.data.status === 'error' || response.status !== 200) {
                return res.status(400).send(`Error logging in : ${response.data.message}`);
            }
            res.cookie('smacon', response.data.message.token, { httpOnly: true, expires: expiryDate });
            return res.status(200).sendFile("index.html", { root: './views' });
        }

        if (decodedToken && decodedToken.exp > Date.now() / 1000) {
            return res.status(200).sendFile("index.html", { root: './views' });
        }
    } catch (err) {
        console.log("err.response :- ", err)
        logger(`${username} | Error : ${err.response}`);
        return res.status(500).json({ message: `${err.response}`, status: "error" });
    }
};

module.exports = { loginPage, logIn }
