class AIRequestHandler {
    constructor(sessionManager) {
        this.aiInstance = aiInstance;
        this.sessionManager = sessionManager;
    }

    handleUserInput(userInput) {
        if (!userInput || typeof userInput !== 'string') {
            console.error("Invalid user input");
            return;
        }

        const formattedRequest = userInput;
        return this.sendToAI(formattedRequest);
    }


    async sendToAI(request) {
        try {
            const response = await this.aiInstance.getResponse(request);
            this.sessionManager.logConversation(userInput, response);
            return response;
        } catch (error) {
            console.error("Error processing AI request:", error);
            return "An error occurred while processing your request.";
        }
    }
}