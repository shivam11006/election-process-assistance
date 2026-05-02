import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, RefreshCcw } from 'lucide-react';

const Eligibility = () => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        age: '',
        citizenship: '',
        criminalRecord: ''
    });
    const [result, setResult] = useState(null);

    const checkEligibility = () => {
        if (parseInt(answers.age) >= 18 && answers.citizenship === 'Indian') {
            setResult('Eligible');
        } else {
            setResult('Ineligible');
        }
    };

    const handleReset = () => {
        setStep(1);
        setAnswers({ age: '', citizenship: '', criminalRecord: '' });
        setResult(null);
    };

    return (
        <div className="max-w-2xl mx-auto py-8 md:py-12 px-4 md:px-0">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Am I Eligible to Vote?</h1>
                <p className="text-slate-400">Answer a few quick questions to find out your status in the Indian electoral system.</p>
            </div>

            <div className="glass-card p-6 md:p-10 min-h-[400px] flex flex-col">
                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div 
                            key="questions"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col"
                        >
                            <div className="mb-10">
                                <div className="flex justify-between text-sm text-slate-500 mb-4">
                                    <span>Question {step} of 3</span>
                                    <span>{Math.round((step/3)*100)}% Complete</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-primary-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(step/3)*100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                {step === 1 && (
                                    <Question 
                                        title="What is your age?"
                                        description="You must be at least 18 years old on the qualifying date."
                                    >
                                        <input 
                                            type="number" 
                                            className="input-field text-2xl text-center"
                                            placeholder="18"
                                            value={answers.age}
                                            onChange={(e) => setAnswers({...answers, age: e.target.value})}
                                            onKeyDown={(e) => e.key === 'Enter' && setStep(2)}
                                        />
                                    </Question>
                                )}

                                {step === 2 && (
                                    <Question 
                                        title="Are you an Indian Citizen?"
                                        description="Only citizens of India are eligible to register as voters."
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <OptionBtn 
                                                selected={answers.citizenship === 'Indian'} 
                                                onClick={() => setAnswers({...answers, citizenship: 'Indian'})}
                                            >
                                                Yes, I am
                                            </OptionBtn>
                                            <OptionBtn 
                                                selected={answers.citizenship === 'Non-Indian'} 
                                                onClick={() => setAnswers({...answers, citizenship: 'Non-Indian'})}
                                            >
                                                No, I am not
                                            </OptionBtn>
                                        </div>
                                    </Question>
                                )}

                                {step === 3 && (
                                    <Question 
                                        title="Do you have any disqualifying criminal record?"
                                        description="Certain convictions or mental health status may disqualify a voter under Section 16 of RPA."
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <OptionBtn 
                                                selected={answers.criminalRecord === 'No'} 
                                                onClick={() => setAnswers({...answers, criminalRecord: 'No'})}
                                            >
                                                No
                                            </OptionBtn>
                                            <OptionBtn 
                                                selected={answers.criminalRecord === 'Yes'} 
                                                onClick={() => setAnswers({...answers, criminalRecord: 'Yes'})}
                                            >
                                                Yes
                                            </OptionBtn>
                                        </div>
                                    </Question>
                                )}
                            </div>

                            <div className="flex justify-between mt-10">
                                <button 
                                    onClick={() => setStep(s => Math.max(1, s-1))}
                                    className={`px-6 py-2 rounded-xl transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:bg-white/5'}`}
                                >
                                    Back
                                </button>
                                {step < 3 ? (
                                    <button 
                                        disabled={!canProgress(step, answers)}
                                        onClick={() => setStep(s => s + 1)}
                                        className="btn-primary"
                                    >
                                        Next Question
                                    </button>
                                ) : (
                                    <button 
                                        disabled={!answers.criminalRecord}
                                        onClick={checkEligibility}
                                        className="btn-primary"
                                    >
                                        Check Results
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1 flex flex-col items-center justify-center text-center"
                        >
                            {result === 'Eligible' ? (
                                <>
                                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">You Are Eligible!</h2>
                                    <p className="text-slate-400 max-w-md mb-8">
                                        Based on your answers, you meet the primary criteria to vote in Indian elections. 
                                        If you haven't registered yet, you can do so on the official NVSP portal.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                                        <XCircle className="w-12 h-12 text-red-500" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-4">Not Eligible</h2>
                                    <p className="text-slate-400 max-w-md mb-8">
                                        Based on the information provided, you may not be eligible to vote at this time. 
                                        Eligibility usually requires being an Indian citizen and 18+ years of age.
                                    </p>
                                </>
                            )}
                            <button 
                                onClick={handleReset}
                                className="flex items-center gap-2 px-6 py-3 border border-slate-700 hover:bg-slate-800 rounded-xl transition-all"
                            >
                                <RefreshCcw className="w-5 h-5" /> Start Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-8 p-4 bg-primary-900/20 border border-primary-500/20 rounded-xl flex gap-4">
                <Info className="w-6 h-6 text-primary-400 shrink-0" />
                <p className="text-sm text-slate-300">
                    This checker is for informational purposes. Final eligibility is determined by the 
                    Election Commission of India (ECI) upon registration.
                </p>
            </div>
        </div>
    );
};

const Question = ({ title, description, children }) => (
    <div className="space-y-6">
        <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
            <p className="text-sm md:text-base text-slate-400">{description}</p>
        </div>
        <div className="py-4">
            {children}
        </div>
    </div>
);

const OptionBtn = ({ selected, onClick, children }) => (
    <button 
        onClick={onClick}
        className={`p-4 md:p-6 rounded-2xl border-2 transition-all text-base md:text-lg font-bold ${
            selected 
                ? 'border-primary-500 bg-primary-500/10 text-white' 
                : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
        }`}
    >
        {children}
    </button>
);

const canProgress = (step, answers) => {
    if (step === 1) return answers.age && parseInt(answers.age) > 0;
    if (step === 2) return answers.citizenship;
    if (step === 3) return answers.criminalRecord;
    return false;
};

export default Eligibility;
