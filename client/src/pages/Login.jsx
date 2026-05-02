import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 md:p-10 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <LogIn className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="text-slate-400 mt-2">Enter your credentials to access your guide</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center mt-8 text-slate-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary-500 hover:underline font-semibold">Register Now</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
