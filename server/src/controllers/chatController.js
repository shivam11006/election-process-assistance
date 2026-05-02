import Chat from '../models/Chat.js';
import { getGeminiResponse } from '../utils/geminiHelper.js';

export const sendMessage = async (req, res) => {
    try {
        const { message, chatId } = req.body;
        console.log(`Received message for chat: ${chatId || 'New Chat'}`);

        let chat;
        if (chatId) {
            chat = await Chat.findOne({ _id: chatId, user: req.user.id });
        }

        if (!chat) {
            chat = await Chat.create({
                user: req.user.id,
                messages: [],
                title: message.substring(0, 30) + '...'
            });
        }

        // Add user message
        chat.messages.push({
            role: 'user',
            content: message
        });

        // Get AI response
        const aiResponse = await getGeminiResponse(message, chat.messages.slice(0, -1));

        // Add assistant message
        chat.messages.push({
            role: 'assistant',
            content: aiResponse
        });

        await chat.save();

        res.json({
            success: true,
            chatId: chat._id,
            response: aiResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getHistory = async (req, res) => {
    try {
        const chats = await Chat.find({ user: req.user.id }).sort({ updatedAt: -1 });
        res.json({
            success: true,
            count: chats.length,
            data: chats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getChat = async (req, res) => {
    try {
        const chat = await Chat.findOne({ _id: req.params.id, user: req.user.id });
        
        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        res.json({
            success: true,
            data: chat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found'
            });
        }

        res.json({
            success: true,
            message: 'Chat deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
