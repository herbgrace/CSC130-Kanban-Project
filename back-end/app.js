const express = require('express');
const session = require('express-session');
require('dotenv').config();
const app = express();
const dal = require('./data/mongoDAL');
const frontendport = 9000;
const port = 9001;
const cors = require('cors');

app.use(cors({
    origin: `http://localhost:${frontendport}`, // front-end origin
    credentials: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'KeepThisTotallySeCretSoNoOneCanGuessIt',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, 
        httpOnly: true,
        sameSite: 'lax'
    }
}));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await dal.dal.getUser({ username, password });
    if (user) {
        req.session.user = user._id;
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.get('/shows', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not Logged In! Login to add and view shows.' });
    }
    const shows = await dal.dal.getAllShows(req.session.user);
    res.status(200).json({ shows });
});

app.post('/shows', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not Logged In! Login to add and view shows.' });
    }
    const show = req.body;
    const result = await dal.dal.addShow({ ...show, userId: req.session.user });
    res.status(201).json({ message: 'Show added!', show: result });
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Log out successful' });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const result = await dal.dal.addUser({ username, password });
    res.status(201).json({ message: 'Registration successful', user: result });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});