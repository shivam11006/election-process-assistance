import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { UserPlus, FileText, Megaphone, Vote, BarChart3, CheckCircle2, Clock, Circle } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    stage: 'Voter Registration',
    title: 'Register to Vote',
    description: 'The first step is ensuring you are registered. Use the NVSP portal to apply or update your details.',
    status: 'Completed',
    icon: <UserPlus className="w-6 h-6" />,
    date: 'Jan 15 - Feb 15'
  },
  {
    id: 2,
    stage: 'Candidate Nomination',
    title: 'Filing of Nominations',
    description: 'Candidates from all parties file their nomination papers with the Election Commission.',
    status: 'Ongoing',
    icon: <FileText className="w-6 h-6" />,
    date: 'March 01 - March 15'
  },
  {
    id: 3,
    stage: 'Campaigning',
    title: 'Election Campaign',
    description: 'Political parties and candidates reach out to voters through rallies and public meetings.',
    status: 'Upcoming',
    icon: <Megaphone className="w-6 h-6" />,
    date: 'March 20 - May 20'
  },
  {
    id: 4,
    stage: 'Voting Day',
    title: 'National Polling Day',
    description: 'Cast your valuable vote at your assigned polling booth. Remember to carry your Voter ID.',
    status: 'Upcoming',
    icon: <Vote className="w-6 h-6" />,
    date: 'June 01'
  },
  {
    id: 5,
    stage: 'Counting & Results',
    title: 'Counting and Declaration',
    description: 'Votes are counted across all stations and the results are officially announced.',
    status: 'Upcoming',
    icon: <BarChart3 className="w-6 h-6" />,
    date: 'June 04'
  }
];

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex items-center justify-between w-full mb-12 md:mb-20 flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content Card */}
      <div className="w-full md:w-[42%] ml-12 md:ml-0">
        <div className={`glass-card p-6 md:p-8 border-l-4 group hover:bg-white/5 transition-all duration-500 ${
          item.status === 'Completed' ? 'border-l-green-500' : 
          item.status === 'Ongoing' ? 'border-l-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 
          'border-l-slate-700'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 md:p-3 rounded-xl ${
              item.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
              item.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-400' :
              'bg-slate-800 text-slate-400'
            }`}>
              {item.icon}
            </div>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                item.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                item.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-400 animate-pulse' :
                'bg-slate-700 text-slate-400'
              }`}>
                {item.status}
              </span>
              <p className="text-xs text-slate-500 mt-1 font-mono">{item.date}</p>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">{item.title}</h3>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Central Node */}
      <div className="absolute left-4 md:left-auto md:relative flex items-center justify-center">
        <motion.div 
            whileHover={{ scale: 1.2 }}
            className={`z-10 w-8 h-8 md:w-12 md:h-12 rounded-full border-2 md:border-4 bg-slate-950 flex items-center justify-center transition-colors duration-500 ${
                item.status === 'Completed' ? 'border-green-500 text-green-500' :
                item.status === 'Ongoing' ? 'border-blue-500 text-blue-500' :
                'border-slate-800 text-slate-700'
            }`}
        >
            {item.status === 'Completed' ? (
                <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6" />
            ) : item.status === 'Ongoing' ? (
                <Clock className="w-4 h-4 md:w-6 md:h-6 animate-spin-slow" />
            ) : (
                <Circle className="w-4 h-4 md:w-6 md:h-6 fill-current" />
            )}
        </motion.div>
      </div>

      {/* Spacer for reverse layout (hidden on mobile) */}
      <div className="hidden md:block w-[42%]" />
    </motion.div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="py-20 max-w-6xl mx-auto px-4">
      <div className="text-center mb-24">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold mb-6"
        >
            Election <span className="text-primary-500">Journey</span> 2026
        </motion.h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          From registration to the declaration of results, follow every step of the democratic process.
        </p>
      </div>

      <div ref={containerRef} className="relative">
        {/* Animated Progress Line */}
        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-1 h-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            style={{ scaleY }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-500 to-primary-600 origin-top"
          />
        </div>

        {/* Timeline Items */}
        <div className="relative">
          {timelineData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
