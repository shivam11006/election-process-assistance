import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Vote, User, LogOut, MessageSquare, Calendar, CheckCircle, MapPin, Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="glass sticky top-0 z-50 px-4 md:px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary-500">
                    <Vote className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="bg-gradient-to-r from-election-orange via-white to-election-green bg-clip-text text-transparent">
                        Election Guide
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <LanguageToggle />
                    <Link to="/timeline" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
                        <Calendar className="w-4 h-4" /> Timeline
                    </Link>
                    <Link to="/eligibility" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
                        <CheckCircle className="w-4 h-4" /> Eligibility
                    </Link>
                    <Link to="/booths" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
                        <MapPin className="w-4 h-4" /> Booths
                    </Link>
                    {user ? (
                        <>
                            <Link to="/chat" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
                                <MessageSquare className="w-4 h-4" /> Assistant
                            </Link>
                            <Link to="/dashboard" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
                                <User className="w-4 h-4" /> Dashboard
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link>
                            <Link to="/register" className="btn-primary">Register</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <LanguageToggle />
                    <button 
                        onClick={toggleMenu}
                        className="p-2 text-slate-300 hover:text-white transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 border-b border-slate-800 py-6 px-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
                    <Link to="/timeline" onClick={closeMenu} className="flex items-center gap-3 text-lg hover:text-primary-400">
                        <Calendar className="w-5 h-5" /> Timeline
                    </Link>
                    <Link to="/eligibility" onClick={closeMenu} className="flex items-center gap-3 text-lg hover:text-primary-400">
                        <CheckCircle className="w-5 h-5" /> Eligibility
                    </Link>
                    <Link to="/booths" onClick={closeMenu} className="flex items-center gap-3 text-lg hover:text-primary-400">
                        <MapPin className="w-5 h-5" /> Booths
                    </Link>
                    {user ? (
                        <>
                            <Link to="/chat" onClick={closeMenu} className="flex items-center gap-3 text-lg hover:text-primary-400">
                                <MessageSquare className="w-5 h-5" /> Assistant
                            </Link>
                            <Link to="/dashboard" onClick={closeMenu} className="flex items-center gap-3 text-lg hover:text-primary-400">
                                <User className="w-5 h-5" /> Dashboard
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-3 text-lg text-red-400"
                            >
                                <LogOut className="w-5 h-5" /> Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4 pt-4 border-t border-slate-800">
                            <Link to="/login" onClick={closeMenu} className="text-lg hover:text-primary-400">Login</Link>
                            <Link to="/register" onClick={closeMenu} className="btn-primary text-center">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
