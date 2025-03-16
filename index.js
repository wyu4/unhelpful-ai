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

console.log('Pushing main page');
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Now listening to http://localhost:${port}`);
});

// To start, run 'node index.js'