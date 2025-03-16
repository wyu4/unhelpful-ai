async function generateCompletion(level, userInput, callback) {
    fetch('/completion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'level': level,
            'prompt': `${userInput}`
        }
    }).then(response => response.json()).then(data => {
        callback(data.choices[0].message.content);
    }).catch(error => {
        console.error('Error:', error);
        callback('ummmm');
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateCompletion };
}