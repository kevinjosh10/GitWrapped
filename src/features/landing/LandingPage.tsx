import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, ArrowRight } from 'lucide-react';
import { useWrappedStore } from '../../store/useWrappedStore';

export const LandingPage: React.FC = () => {
  const [input, setInput] = useState('');
  const { analyzeProfile, error, stage } = useWrappedStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      analyzeProfile(input.trim());
    }
  };

  const isAnalyzing = stage === 'analyzing';

  // Text animation variants for "cooler" text appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white">
      {/* Background Premium Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-github-accent/20 to-purple-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tl from-purple-700/20 to-blue-500/10 rounded-full blur-[150px]" 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center text-center"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
          <Github className="w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            GitWrapped
          </h2>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-6 leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-sm">
            Your GitHub
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            tells a story.
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-2xl font-medium tracking-wide"
        >
          Discover hidden insights behind your code. Turn your GitHub profile into a beautifully animated, shareable journey.
        </motion.p>

        <motion.form 
          variants={itemVariants}
          onSubmit={handleSubmit} 
          className="w-full max-w-lg relative group"
        >
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-500 group-focus-within:text-github-accent transition-colors duration-300" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAnalyzing}
            placeholder="Enter GitHub username"
            className="w-full bg-[#161b22]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 focus:border-github-accent focus:ring-1 focus:ring-github-accent text-white text-lg rounded-2xl py-5 pl-14 pr-36 outline-none transition-all placeholder:text-gray-500 shadow-2xl"
          />
          <button
            type="submit"
            disabled={!input.trim() || isAnalyzing}
            className="absolute inset-y-2 right-2 px-6 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Analyze <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </button>
        </motion.form>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-red-400 bg-red-400/10 px-6 py-3 rounded-xl border border-red-400/20 font-medium"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
