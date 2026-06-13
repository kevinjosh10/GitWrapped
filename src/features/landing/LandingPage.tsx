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

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-github-dark text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-github-accent/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-3 mb-6">
          <Github className="w-10 h-10 text-white" />
          <h2 className="text-2xl font-bold tracking-tight">GitWrapped</h2>
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Your GitHub tells a story.
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 max-w-lg">
          Discover hidden insights behind your code. Turn your GitHub profile into a shareable visual journey.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-github-accent transition-colors" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAnalyzing}
            placeholder="Enter GitHub username"
            className="w-full bg-[#161b22] border border-[#30363d] focus:border-github-accent focus:ring-1 focus:ring-github-accent text-white rounded-2xl py-4 pl-12 pr-32 outline-none transition-all placeholder:text-gray-500 shadow-xl"
          />
          <button
            type="submit"
            disabled={!input.trim() || isAnalyzing}
            className="absolute inset-y-2 right-2 px-4 bg-white text-black font-semibold rounded-xl flex items-center gap-2 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-white transition-all"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Analyze <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
