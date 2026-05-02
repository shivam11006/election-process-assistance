import { motion } from 'framer-motion';

const TypingIndicator = () => {
    return (
        <div className="flex gap-1.5 p-3 bg-slate-800 rounded-2xl rounded-tl-none w-fit">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2
                    }}
                    className="w-2 h-2 bg-primary-400 rounded-full"
                />
            ))}
        </div>
    );
};

export default TypingIndicator;
