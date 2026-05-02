import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 md:p-10 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <UserPlus className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold">Create Account</h2>
                    <p className="text-slate-400 mt-2">Join us to simplify your election journey</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                                type="text"
                                required
                                className="input-field pl-12"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                                type="email"
                                required
                                className="input-field pl-12"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input 
                                type="password"
                                required
                                className="input-field pl-12"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className="btn-primary w-full py-4 text-lg"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center mt-8 text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-500 hover:underline font-semibold">Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
