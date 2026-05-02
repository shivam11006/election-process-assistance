import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Vote, Shield, MessageCircle, MapPin, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col gap-20 py-10">
            {/* Hero Section */}
            <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex-1 text-center lg:text-left px-2 md:px-0">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6"
                    >
                        Empowering <span className="text-primary-500">Every Voter</span> with Knowledge.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0"
                    >
                        Your interactive guide to understanding the election process, checking eligibility, 
                        and finding your polling booth in India.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                    >
                        <Link to="/register" className="btn-primary flex items-center justify-center gap-2 py-3">
                            Get Started <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/timeline" className="px-6 py-3 border border-slate-700 hover:bg-slate-800 rounded-xl transition-all font-semibold text-center">
                            View Timeline
                        </Link>
                    </motion.div>
                </div>

                <div className="flex-1 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative z-10 animate-float"
                    >
                        <div className="glass-card p-2 bg-gradient-to-br from-primary-600/20 to-transparent overflow-hidden rounded-3xl">
                            <img 
                                src="https://tse4.mm.bing.net/th/id/OIP.bESs7KTG0EuDNynkMe9VXAHaEK?w=1200&h=675&rs=1&pid=ImgDetMain&o=7&rm=3" 
                                alt="Election Guide Hero" 
                                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                            />
                        </div>
                    </motion.div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-600/20 blur-[100px] rounded-full"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-election-orange/10 blur-[100px] rounded-full"></div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<MessageCircle className="w-8 h-8 text-blue-400" />}
                    title="AI Assistant"
                    description="Chat with our AI to get instant answers about registration, candidates, and voting rules."
                />
                <FeatureCard 
                    icon={<Shield className="w-8 h-8 text-green-400" />}
                    title="Eligibility Checker"
                    description="Quickly find out if you are eligible to vote based on Indian election laws."
                />
                <FeatureCard 
                    icon={<MapPin className="w-8 h-8 text-orange-400" />}
                    title="Booth Locator"
                    description="Locate your nearest polling booth and election offices with interactive maps."
                />
            </section>
        </div>
    );
};

const FeatureCard = React.memo(({ icon, title, description }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="glass-card p-6 md:p-8 hover:bg-white/5"
    >
        <div className="mb-4 md:mb-6">{icon}</div>
        <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

export default Home;

