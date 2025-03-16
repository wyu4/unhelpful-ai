async function generateCompletion(level, userInput, callback) {
    fetch('/completion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'level': level,
            'prompt': `${userInput}`
        }
    }).then(response => response.json()).then(data => {
        const prompt = data.choices[0].message.content;
        console.log('\n------------------------------------------------------------------\nUsers: ' + userInput + '\nAI: ' + prompt + '\n------------------------------------------------------------------\n');
        callback(prompt);
    }).catch(error => {
        console.error('Error:', error);
        callback('ummmm');
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateCompletion };
}

// https://ai.hackclub.com/chat/completions