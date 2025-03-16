const maxHistory = 20;
const history = [];

function generateCompletion(level, userInput, callback) {
    history.push({role:'user',content:userInput});

    fetch('/completion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'level': level,
            'prompt': `${userInput}`
        },
        body: history
    }).then(response => response.json()).then(data => {
        const prompt = data.choices[0].message.content;
        console.log('\n------------------------------------------------------------------\nLevel: ' + level + '\nUsers: ' + userInput + '\nAI: ' + prompt + '\n------------------------------------------------------------------\n');
        history.push({role:'assistant',content:prompt});
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