import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [
        {
            role: {
                type: String,
                enum: ['user', 'assistant'],
                required: true
            },
            content: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    title: {
        type: String,
        default: 'New Chat'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

chatSchema.pre('save', function() {
    this.updatedAt = Date.now();
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
