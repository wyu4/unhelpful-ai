const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

console.log('Setting up dotenv...');
require('dotenv').config({ path: __dirname + '/.env' });

console.log('Moving to public folder...');
app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());

// Handle the AI requests
console.log('Setting up OpenAI client...');
app.get('/test', (req, res) => {
    res.send('This is a test. If you\'re seeing this, it worked!');
})

app.post('/completion', (req, res) => {
    const settings = req.body.settings;

    fetch('https://api.openai.com/v1/chat/completions', { // https://api.openai.com/v1/chat/completions https://ai.hackclub.com/chat/completions
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.SCRAPYARD_KEY
        },
        body: settings
    }).then(response => response.json()).then(responseData => {
        console.log(responseData);
        res.send(responseData);
    }).catch(error => {
        console.error('Error:', error);
        res.status(500).send({ error: 'Failed to fetch from OpenAI API' });
    });
});

router.get("/", (req, res) => {
    res.sendFile("index.html");
});

console.log('Using router...');
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);