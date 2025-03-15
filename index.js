const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname})
})

app.listen(port, () => {
    console.log(`Now listening to http://localhost:${port}`);
}); 

// To start, run 'node index.js'