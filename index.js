const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

console.log('Setting up dotenv...');
require('dotenv').config({path: __dirname + '/.env'});

console.log('Moving to public folder...');
app.use(express.static(path.join(__dirname, "public")));


// Handle the AI requests
console.log('Setting up OpenAI client...');
app.get('/test', (req, res) => {
    res.send('This is a test. If you\'re seeing this, it worked!');
})

app.get('/completion', (req, res) => {
    let apiKey = process.env.SCRAPYARD_KEY
    const data = {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: req.headers.prompt,
          }
        ],
        max_tokens: 300
    };

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(responseData => {
        res.send(responseData);
    }).catch(error => {
        res.status(500).send({ error: 'Failed to fetch from OpenAI API' });
    });
});

console.log('Pushing index.html');
app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname})
})

app.listen(port, () => {
    console.log(`Now listening to http://localhost:${port}`);
}); 

// To start, run 'node index.js'