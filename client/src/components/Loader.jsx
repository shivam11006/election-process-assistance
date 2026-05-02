import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-800 rounded-full"></div>
        
        {/* Animated Spinner */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Pulse effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-primary-500/20 rounded-full animate-pulse"></div>
      </div>
      
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-slate-200 animate-pulse">Loading</h3>
        <p className="text-sm text-slate-500 uppercase tracking-widest mt-1">Please wait a moment</p>
      </div>
      
      {/* Skeleton placeholders for better UX */}
      <div className="w-full max-w-md mt-8 space-y-4 px-4 opacity-20">
        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
        <div className="h-4 bg-slate-800 rounded w-full"></div>
        <div className="h-4 bg-slate-800 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default Loader;
