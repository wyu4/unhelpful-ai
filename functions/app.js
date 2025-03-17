const express = require('express');
const path = require('path');
const serverless = require('serverless-http'); // Make sure to include this!
const app = express();
const router = express.Router();

console.log('Setting up dotenv...');
require('dotenv').config({ path: __dirname + '/.env' });

console.log('Moving to public folder...');
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

console.log('Setting up OpenAI client...');
router.get('/test', (req, res) => {
    res.send("This is a test. If you're seeing this, it worked!");
});

router.post('/completion', (req, res) => {
    const settings = req.body.settings;

    fetch('https://ai.hackclub.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: settings
    })
    .then(response => response.json())
    .then(responseData => {
        res.send(responseData);
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).send({ error: 'Failed to fetch from OpenAI API' });
    });
});

// Attach the router to the Express app
app.use("/.netlify/functions/app", router);

// console.log('Pushing main page');
// app.get('/', (req, res) => {
//     res.sendFile('index.html', { root: __dirname });
// });

// Export the handler for Netlify
module.exports.handler = serverless(app);
