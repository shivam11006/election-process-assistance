import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, CheckCircle, Fingerprint, CreditCard, Vote as VoteIcon, Loader2 } from 'lucide-react';

// Lazy load the heavy Map component
const MapView = lazy(() => import('../components/MapView'));

const MapPlaceholder = () => (
    <div className="h-[500px] w-full flex flex-col items-center justify-center glass-card border-dashed border-2 border-slate-800">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Initializing Interactive Map...</p>
    </div>
);


const Booths = () => {
    return (
        <div className="flex flex-col gap-12 py-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
                        <MapPin className="text-primary-500 w-6 h-6 md:w-8 md:h-8" />
                        Locate Polling Booths
                    </h1>
                    <p className="text-slate-400 mt-2 text-base md:text-lg">Find your nearest polling station and election commission offices.</p>
                </div>
            </header>

            {/* Voting Guide Section */}
            <section className="grid lg:grid-cols-2 gap-10 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest w-fit">
                        <Info className="w-4 h-4" /> Voting Day Guide
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">What to expect at the Polling Booth?</h2>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                        Follow these 4 simple steps to cast your vote successfully. Make sure to carry 
                        your EPIC (Voter ID) card or any of the 12 alternative photo identity documents.
                    </p>

                    <div className="space-y-6 mt-4">
                        <GuideStep 
                            icon={<CreditCard className="text-blue-400" />}
                            title="1. Identity Verification"
                            description="First polling official checks your name on the voter list and checks your ID proof."
                        />
                        <GuideStep 
                            icon={<Fingerprint className="text-green-400" />}
                            title="2. Inking & Register"
                            description="Second polling official will ink your finger, give you a slip and take your signature."
                        />
                        <GuideStep 
                            icon={<VoteIcon className="text-primary-400" />}
                            title="3. Cast Your Vote"
                            description="Go to the voting compartment and press the blue button on the EVM next to the candidate of your choice."
                        />
                        <GuideStep 
                            icon={<CheckCircle className="text-orange-400" />}
                            title="4. VVPAT Verification"
                            description="Check the VVPAT window. A slip will be visible for 7 seconds showing your selected candidate."
                        />
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative rounded-3xl overflow-hidden glass-card p-2 border-slate-800"
                >
                    <img 
                        src="/voting_process_guide.png"
                        alt="Voting Process Guide" 
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1540910419892-f0c742c30363?auto=format&fit=crop&q=80&w=1000";
                            e.target.onerror = null;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                </motion.div>
            </section>

            {/* Map Section */}
            <section className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Interactive Booth Locator</h2>
                    <span className="text-sm text-slate-500">Showing 12 booths near you</span>
                </div>
                <Suspense fallback={<MapPlaceholder />}>
                    <MapView />
                </Suspense>
            </section>
        </div>
    );
};

const GuideStep = ({ icon, title, description }) => (
    <div className="flex gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-primary-500 transition-colors">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-lg">{title}</h4>
            <p className="text-slate-500 text-sm">{description}</p>
        </div>
    </div>
);

export default Booths;
