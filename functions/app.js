const express = require('express');
const path = require('path');
const serverless = require('serverless-http'); // Make sure to include this!
const app = express();
const router = express.Router();

// Move to the public folder
app.use(express.static(path.join(__dirname, "../public")));

// Use Express to parse JSON content
app.use(express.json());


// AI API
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

// Export the handler for Netlify
module.exports.handler = serverless(app);
