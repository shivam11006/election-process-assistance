import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, MessageSquare, Calendar, CheckCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col gap-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
                        <LayoutDashboard className="text-primary-500 w-6 h-6 md:w-8 md:h-8" />
                        Welcome, {user?.name}
                    </h1>
                    <p className="text-slate-400 mt-2 text-base md:text-lg">Your personalized election assistant dashboard.</p>
                </div>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Voter Status" value="Registered" color="text-green-400" />
                <StatCard title="Election Phase" value="Upcoming" color="text-blue-400" />
                <StatCard title="Chat History" value="12 Messages" color="text-primary-400" />
                <StatCard title="Booth Location" value="Assigned" color="text-orange-400" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-8">

                    <section className="grid md:grid-cols-2 gap-6">
                        <QuickAction 
                            icon={<MessageSquare />}
                            title="Ask Assistant"
                            to="/chat"
                            color="bg-blue-500"
                        />
                        <QuickAction 
                            icon={<CheckCircle />}
                            title="Check Eligibility"
                            to="/eligibility"
                            color="bg-green-500"
                        />
                        <QuickAction 
                            icon={<Calendar />}
                            title="View Timeline"
                            to="/timeline"
                            color="bg-orange-500"
                        />
                        <QuickAction 
                            icon={<MapPin />}
                            title="Polling Booths"
                            to="/booths"
                            color="bg-primary-500"
                        />
                    </section>
                </div>

                <aside className="glass-card p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Calendar className="text-primary-500" />
                        Upcoming Deadlines
                    </h2>
                    <div className="space-y-6">
                        <DeadlineItem date="May 15" title="Registration Ends" />
                        <DeadlineItem date="May 20" title="Nomination Filing" />
                        <DeadlineItem date="June 01" title="Voting Day" />
                    </div>
                </aside>
            </div>
        </div>
    );
};

const StatCard = React.memo(({ title, value, color }) => (
    <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 border-l-4 border-l-primary-500">
        <h3 className="text-slate-400 text-[10px] md:text-xs uppercase tracking-wider font-semibold">{title}</h3>
        <p className={`text-xl md:text-2xl font-bold mt-2 ${color}`}>{value}</p>
    </motion.div>
));

StatCard.displayName = 'StatCard';

const QuickAction = React.memo(({ icon, title, to, color }) => (
    <Link to={to}>
        <motion.div whileHover={{ y: -5 }} className="glass-card p-4 md:p-6 flex items-center gap-4 hover:bg-white/5 group">
            <div className={`p-2 md:p-3 rounded-lg ${color} text-white transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <span className="font-bold text-base md:text-lg">{title}</span>
        </motion.div>
    </Link>
));

QuickAction.displayName = 'QuickAction';

const DeadlineItem = React.memo(({ date, title }) => (
    <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
        <div className="text-center bg-primary-600/20 text-primary-400 px-3 py-1 rounded-lg">
            <span className="block font-bold">{date.split(' ')[1]}</span>
            <span className="text-xs uppercase">{date.split(' ')[0]}</span>
        </div>
        <span className="font-semibold text-slate-200">{title}</span>
    </div>
));

DeadlineItem.displayName = 'DeadlineItem';

export default Dashboard;

