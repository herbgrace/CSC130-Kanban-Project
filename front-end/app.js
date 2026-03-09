const express = require('express');
const { animesearch, animeinfo, animedl } = require("anime-heaven");
const app = express();
const port = 9000;
const backend_port = 9001;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', async (req, res) => {
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/register', async (req, res) => {
    res.redirect('/register');
});


app.get('/scrape', async (req, res) => {
    results = await animesearch("");
    res.render('scrape.ejs', {
        results: results
    });
});

app.post('/scrape', async (req, res) => {
    const { animeTitle } = req.body;
    results = await animesearch(animeTitle);
    res.render('scrape.ejs', {
        results: results
    });
});

app.get('/shows', async (req, res) => {
    try {
        const response = await fetch(`http://localhost:${backend_port}/shows`, {
            headers: {
                'Cookie': req.headers.cookie || ''
            }
        });

        if (response.status === 401) {
            return res.redirect('/login');
        }

        const data = await response.json();
        const results = Array.isArray(data.shows) ? data.shows : [];
        const errorMessage = response.ok ? '' : (data.message || 'Unable to load saved shows.');

        res.render('shows.ejs', { results, errorMessage });
    } catch (error) {
        console.error(error);
        res.render('shows.ejs', {
            results: [],
            errorMessage: 'Unable to connect to the back-end service.'
        });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});