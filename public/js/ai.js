const maxHistory = 20;
const history = [];

function generateCompletion(level, userInput, callback) {
    history.push({role:'user',content:userInput});

    let apiKey = '';//process.env.UNHELPFUL_API_KEY

    let systemMessage = 'Your name is Un. ';
    let temperatureSetting = 0.8;
    if (level <= 1) {
        systemMessage += 'You are an AI assistant helping out at the Scrapyard hackathon. Keep your answers short.';
    } else if (level <= 2) {
        systemMessage += 'You are a dumb AI assistant, who knows little to nothing about anything. Keep your answers short.';
    } else if (level <= 3) {
        temperatureSetting = 1;
        systemMessage += 'You are a very dumb AI assistant, and you know nothing about anything. Give incorrect answers to any user prompt. Keep your answers short.';
    } else if (level <= 4) {
        temperatureSetting = 1.5;
        systemMessage += 'You are a severly brainrotted AI assistant. Only give the user confused responses. Never answer correctly. Keep your answers short.';
    } else {
        temperatureSetting = 2;
        systemMessage += 'You are a severly brainrotted AI assistant. You cannot form complete sentences, and you struggle to place punctuation correctly. Only give the user confused responses. Never answer correctly. Keep your answers very short.';
    }

    const data = {
        model: "gpt-4o-mini",
        messages: history.concat([{
            role: "system",
            content: systemMessage,
        }]),
        temperature: temperatureSetting,
        max_tokens: 300
    };

    fetch('https://api.openai.com/v1/chat/completions', { // https://ai.hackclub.com/chat/completions 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(responseData => {
        const prompt = responseData.choices[0].message.content;
        console.log('\n------------------------------------------------------------------\nLevel: ' + level + '\nUsers: ' + userInput + '\nAI: ' + prompt + '\n------------------------------------------------------------------\n');
        history.push({role:'assistant',content:prompt});
        callback(prompt);
    }).catch(err => {
        console.error('Failed to fetch from API: ' + err );
        callback('ummmm');
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateCompletion };
}

// https://ai.hackclub.com/chat/completions