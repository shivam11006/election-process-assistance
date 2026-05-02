import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiResponse = async (prompt, history = []) => {
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3-flash-preview",
            systemInstruction: "You are the 'Election Guide Assistant'. Your primary goal is to help users understand the election process in India, including registration, eligibility, timelines, and voting steps. Provide clear, accurate, and easy-to-follow information. Use markdown for formatting (bolding, lists, headers) to make the information readable. If a user asks about elections outside of India, provide a brief answer but pivot back to the Indian context. and if the user ask anything else then politely refuse the question."
        });

        // Format history for Gemini
        const chat = model.startChat({
            history: history.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error Message:", error.message);
        if (error.message.includes('API_KEY_INVALID')) {
            console.error("Suggestion: Your GEMINI_API_KEY seems to be invalid.");
        }
        throw new Error(`AI Assistant Error: ${error.message}`);
    }
};
