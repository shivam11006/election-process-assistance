import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Service to interact with Google Gemini AI.
 * Conversion note: This replaces the backend Express routes.
 * 
 * SECURITY WARNING: In a real production environment, you should use Firebase Cloud Functions
 * to proxy these requests so that your API key is not exposed in the client-side code.
 */
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const aiService = {
    /**
     * Send a message to the AI and get a response
     * @param {string} prompt - The user's question
     * @param {Array} history - Previous chat history
     */
    chat: async (prompt, history = []) => {
        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-3-flash-preview",
                systemInstruction: `You are an "Election Assistance" AI specialist for the Indian Election Process. 
                Your goal is to help citizens understand voter registration, eligibility, polling booth locations, and general election procedures in India.
                
                LIMITATIONS:
                1. You must ONLY answer questions related to the Indian Election Process, voting, and democracy in India.
                2. If a user asks an unrelated or "unwanted" question (e.g., about general facts, math, coding, personal advice, or elections in other countries), you must politely state: "I am specifically designed to assist with Indian Election processes. I cannot answer questions unrelated to this topic."
                3. Be professional, neutral, and informative.`
            });


            // Format history for Gemini
            // CRITICAL: Gemini requires history to start with a 'user' role
            let chatHistory = history.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }));

            // Find the index of the first 'user' message
            const firstUserIndex = chatHistory.findIndex(msg => msg.role === 'user');

            // Slice history to start from the first user message
            if (firstUserIndex !== -1) {
                chatHistory = chatHistory.slice(firstUserIndex);
            } else {
                chatHistory = [];
            }

            const chat = model.startChat({
                history: chatHistory,
                generationConfig: {
                    maxOutputTokens: 1000,
                },
            });

            const result = await chat.sendMessage(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {

            console.error("AI Service Error:", error);
            throw new Error("Failed to communicate with AI Assistant.");
        }
    }
};
