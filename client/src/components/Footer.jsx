import { Link } from 'react-router-dom';
import { Vote, Globe, MessageCircle, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass mt-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary-500 mb-6">
                            <Vote className="w-6 h-6 md:w-8 md:h-8" />
                            <span className="bg-gradient-to-r from-election-orange via-white to-election-green bg-clip-text text-transparent">
                                Election Guide
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering citizens with accurate information and interactive tools to navigate the democratic process in India.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                            <li><Link to="/timeline" className="hover:text-primary-400 transition-colors">Election Timeline</Link></li>
                            <li><Link to="/eligibility" className="hover:text-primary-400 transition-colors">Eligibility Checker</Link></li>
                            <li><Link to="/booths" className="hover:text-primary-400 transition-colors">Booth Locator</Link></li>
                            <li><Link to="/chat" className="hover:text-primary-400 transition-colors">AI Assistant</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Resources</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li>
                                <a href="https://voters.eci.gov.in/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
                                    ECI Portal <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.nvsp.in/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
                                    NVSP Services <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li><Link to="/faq" className="hover:text-primary-400 transition-colors">Frequently Asked Questions</Link></li>
                            <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Connect With Us</h4>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Globe className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<MessageCircle className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Mail className="w-5 h-5" />} href="#" />
                        </div>
                        <div className="mt-6 p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
                            <p className="text-[10px] text-primary-400 uppercase font-bold mb-1">Helpdesk</p>
                            <p className="text-sm font-bold text-white">1800-111-400</p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
                    <p>© 2026 Election Guide Assistant. All rights reserved.</p>
                    <p>Built for a stronger democracy 🇮🇳</p>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon, href }) => (
    <a href={href} className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500 transition-all">
        {icon}
    </a>
);

export default Footer;
