import React, { useRef, useEffect, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, AlertCircle, Sparkles } from 'lucide-react';
import TypingIndicator from '../TypingIndicator';

// Lazy load the markdown renderer to further split the bundle
const MarkdownRenderer = lazy(() => import('./MarkdownRenderer'));

const ChatUI = memo(({ messages, loading, error, input, setInput, handleSend }) => {
    const scrollContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    return (
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900/50">
            <header className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 ml-12 md:ml-0">
                    <div className="p-2 bg-primary-600 rounded-lg">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-base flex items-center gap-2">
                            Election Assistant
                            <Sparkles className="w-3 h-3 text-primary-400" />
                        </h2>
                        <p className="text-[10px] text-green-400 flex items-center gap-1">
                            <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
                            AI Model Online
                        </p>
                    </div>
                </div>
            </header>

            <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-3 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`p-2 rounded-full h-fit flex-shrink-0 ${msg.role === 'user' ? 'bg-primary-600' : 'bg-slate-800'}`}>
                                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>
                                <div className={`p-4 rounded-2xl ${
                                    msg.role === 'user' 
                                        ? 'bg-primary-600 text-white rounded-tr-none shadow-primary-900/20' 
                                        : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700/50'
                                } shadow-lg leading-relaxed`}>
                                    {msg.role === 'assistant' ? (
                                        <Suspense fallback={<div className="animate-pulse h-4 bg-slate-700 w-24 rounded"></div>}>
                                            <MarkdownRenderer content={msg.content} />
                                        </Suspense>
                                    ) : (
                                        <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%] items-center">
                            <div className="p-2 rounded-full bg-slate-800">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <TypingIndicator />
                            </div>
                        </div>
                    </motion.div>
                )}
                
                {error && (
                    <div className="flex justify-center">
                        <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-red-500/20">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSend} className="p-4 md:p-6 bg-slate-900/80 border-t border-slate-800">
                <div className="relative flex gap-3 max-w-4xl mx-auto">
                    <textarea 
                        rows="1"
                        className="input-field pr-12 py-3 h-12 md:h-14 text-sm md:text-base resize-none overflow-hidden"
                        placeholder="Ask me anything about the election..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(e);
                            }
                        }}
                        disabled={loading}
                    />
                    <button 
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 text-primary-500 hover:text-primary-400 disabled:opacity-50 transition-colors bg-slate-800/50 rounded-lg"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-center text-[10px] text-slate-600 mt-3 uppercase tracking-widest hidden md:block">
                    AI can make mistakes. Verify important facts.
                </p>
            </form>
        </div>
    );
});

ChatUI.displayName = 'ChatUI';

export default ChatUI;
