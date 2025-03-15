class SessionManager {
    constructor(sessionFile = 'session.txt') {
        this.sessionFile = sessionFile;
    }

    logConversation(userInput, aiResponse) {
        const logEntry = `Human: ${userInput}\nAI: ${aiResponse}\n\n`;
        fs.appendFile(this.sessionFile, logEntry, (err) => {
            if (err) console.error("Error logging conversation:", err);
        });
    }
}
