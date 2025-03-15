const fs = require('fs');

class MessageLogger {
    constructor(filePath = 'session.txt') {
        this.filePath = filePath;
    }

    getMessageCount() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            const messages = data.split('\n').filter(line => line.startsWith('AI:'));
            return messages.length;
        } catch (error) {
            console.error("Error reading the file:", error);
            return 0;
        }
    }
}

// very inefficient way to get the message count lol