const maxHistory = 20;
let history = [];

function generateCompletion(level, userInput, callback) {
    if (history.length >= maxHistory) {
        history = history.slice(-maxHistory);
    }
    history.push({role:'user',content:userInput});
    console.log(history)

    let systemMessage = 'Your name is Un. ';
    let temperatureSetting = 0.8;
    if (level <= 0.5) {
        systemMessage += 'You are an AI assistant, who works for a hackathon named Scrapyard. Keep your answers short.';
    } else if (level <= 2) {
        temperatureSetting = 1;
        systemMessage += 'You are a very dumb AI assistant, and you know nothing about anything. Give incorrect answers to any user prompt. Keep your answers short.';
    } else if (level <= 3) {
        temperatureSetting = 1.25;
        systemMessage += 'You are a brainrotted AI assistant. Only give the user confused responses. Never answer correctly. Keep your answers short.';
    } else if (level <= 4) {
        temperatureSetting = 1.5;
        systemMessage += 'You are a severly brainrotted AI assistant. You cannot form complete sentences, and you struggle to place punctuation correctly. Only give the user confused responses. Never answer correctly. Keep your answers very short.';
    } else {
        callback('THIS HAS BEEN SHUT DOWN BY THE DEVELOPER.');
        return;
    }

    const data = {
        messages: history.concat([{
            role: "system",
            content: systemMessage,
        }]),
        temperature: temperatureSetting,
        max_tokens: 300
    };

    fetch('/.netlify/functions/app/completion', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            settings: JSON.stringify(data)
        })
    }).then(response => response.json()).then(responseData => {
        const prompt = responseData.choices[0].message.content;
        console.log('\n------------------------------------------------------------------\nLevel: ' + level + '\nUsers: ' + userInput + '\nAI: ' + prompt + '\n------------------------------------------------------------------\n');
        history.push({role:'assistant',content:prompt});
        callback(prompt);
    }).catch(err => {
        console.error('Failed to fetch from API: ' + err);
        callback('error');
    });;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateCompletion };
}

// https://ai.hackclub.com/chat/completions