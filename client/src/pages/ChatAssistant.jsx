import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
    Trash2, Plus, MessageSquare, Menu, X, History, User, MessageSquareCode
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import Loader from '../components/Loader';

// Lazy load the heavy Chat UI
const ChatUI = lazy(() => import('../components/chat/ChatUI'));

const ChatAssistant = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your Election Guide Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const fetchHistory = useCallback(async () => {
        setHistoryLoading(true);
        try {
            const response = await api.get('/chat/history');
            setHistory(response.data.data);
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setHistoryLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const loadChat = async (chatId) => {
        setLoading(true);
        setError('');
        try {
            const response = await api.get(`/chat/${chatId}`);
            setMessages(response.data.data.messages);
            setCurrentChatId(chatId);
            if (window.innerWidth < 768) setIsSidebarOpen(false);
        } catch (err) {
            setError('Failed to load chat history');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteChat = async (e, chatId) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this chat?')) return;
        try {
            await api.delete(`/chat/${chatId}`);
            setHistory(prev => prev.filter(chat => chat._id !== chatId));
            if (currentChatId === chatId) createNewChat();
        } catch (err) {
            console.error('Failed to delete chat:', err);
        }
    };

    const createNewChat = () => {
        setMessages([{ role: 'assistant', content: 'Hello! I am your Election Guide Assistant. How can I help you today?' }]);
        setCurrentChatId(null);
        setInput('');
        setError('');
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/chat', { 
                message: userMessage,
                chatId: currentChatId 
            });
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
            if (!currentChatId) {
                setCurrentChatId(response.data.chatId);
                fetchHistory();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to get a response');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-[80vh] glass-card overflow-hidden relative">
            {/* Mobile Sidebar Toggle */}
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden absolute top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg text-slate-200"
            >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sidebar (Kept sync as it's small) */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className={`absolute md:relative z-40 w-72 h-full bg-slate-900/95 border-r border-slate-800 flex flex-col`}
                    >
                        <div className="p-4">
                            <button 
                                onClick={createNewChat}
                                className="w-full flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-xl transition-all font-medium"
                            >
                                <Plus className="w-5 h-5" />
                                New Chat
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
                            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <History className="w-3 h-3" />
                                Recent Chats
                            </div>
                            
                            {historyLoading ? (
                                <div className="p-4 space-y-2">
                                    {[1, 2, 3].map(i => <div key={i} className="h-10 bg-slate-800/50 rounded-lg animate-pulse" />)}
                                </div>
                            ) : (
                                history.map((chat) => (
                                    <div
                                        key={chat._id}
                                        onClick={() => loadChat(chat._id)}
                                        className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all ${
                                            currentChatId === chat._id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'
                                        }`}
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-sm truncate pr-6">{chat.title || 'Untitled Chat'}</span>
                                        <button onClick={(e) => deleteChat(e, chat._id)} className="absolute right-2 opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-800 mt-auto">
                            <div className="flex items-center gap-3 p-2">
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                                    <User className="w-4 h-4 text-slate-300" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium text-slate-200 truncate">My Account</p>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Lazy Loaded Chat Window */}
            <Suspense fallback={
                <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/50">
                    <MessageSquareCode className="w-12 h-12 text-slate-700 animate-bounce mb-4" />
                    <p className="text-slate-500 text-sm font-medium">Loading Chat Interface...</p>
                </div>
            }>
                <ChatUI 
                    messages={messages}
                    loading={loading}
                    error={error}
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                />
            </Suspense>
        </div>
    );
};

export default ChatAssistant;
