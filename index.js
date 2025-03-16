const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

console.log('Setting up dotenv...');
require('dotenv').config({ path: __dirname + '/.env' });

console.log('Moving to public folder...');
app.use(express.static(path.join(__dirname, "public")));


// Handle the AI requests
console.log('Setting up OpenAI client...');
app.get('/test', (req, res) => {
    res.send('This is a test. If you\'re seeing this, it worked!');
})

app.get('/completion', (req, res) => {
    let apiKey = process.env.SCRAPYARD_KEY

    let systemMessage = '';
    const level = parseInt(req.headers.level);
    if (level <= 1) {
        systemMessage = 'You are an AI assistant helping out at the Scrapyard hackathon. Keep your answers short.';
    } else if (level <= 2) {
        systemMessage = 'You are a dumb AI assistant, who knows little to nothing about anything. Keep your answers short.';
    } else if (level <= 3) {
        systemMessage = 'You are a very dumb AI assistant, and you know nothing about anything. Give incorrect answers to any user prompt. Keep your answers short.';
    } else {
        systemMessage = 'Only give the user confused responses. Never answer correctly. Keep your answers very short.';
    }

    console.log(systemMessage);

    const data = {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: systemMessage,
            },
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

console.log('Pushing main page');
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Now listening to http://localhost:${port}`);
});

// To start, run 'node index.js'