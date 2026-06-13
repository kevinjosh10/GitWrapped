import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWrappedStore } from '../../store/useWrappedStore';
import { ChevronRight, ChevronLeft, Github, ArrowRight } from 'lucide-react';

export const WrappedStory: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { userData, stats, setStage } = useWrappedStore();

  if (!userData || !stats) return null;

  const slides = [
    {
      id: 'welcome',
      content: (
        <div className="flex flex-col items-center text-center">
          <motion.img 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            src={userData.avatar_url} 
            alt={userData.name} 
            className="w-32 h-32 rounded-full border-4 border-github-accent shadow-[0_0_40px_rgba(88,166,255,0.4)] mb-8"
          />
          <h2 className="text-3xl font-bold mb-2">Welcome to your GitWrapped,</h2>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            {userData.name || userData.login}
          </h1>
          <p className="text-xl text-gray-400">Let's look back at your journey.</p>
        </div>
      )
    },
    {
      id: 'stats',
      content: (
        <div className="flex flex-col items-center text-center w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-10">The Numbers</h2>
          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="glass-panel p-6 flex flex-col items-center">
              <span className="text-4xl font-black text-white mb-2">{userData.public_repos}</span>
              <span className="text-gray-400 font-medium">Repositories</span>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center">
              <span className="text-4xl font-black text-yellow-400 mb-2">{stats.totalStars}</span>
              <span className="text-gray-400 font-medium">Stars Earned</span>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center">
              <span className="text-4xl font-black text-green-400 mb-2">{stats.totalForks}</span>
              <span className="text-gray-400 font-medium">Forks</span>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center">
              <span className="text-4xl font-black text-blue-400 mb-2">{userData.followers}</span>
              <span className="text-gray-400 font-medium">Followers</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'language',
      content: (
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">Your Weapon of Choice</h2>
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-500 mb-6 drop-shadow-2xl"
          >
            {stats.topLanguage}
          </motion.div>
          <p className="text-xl text-gray-400 max-w-md">
            Out of {Object.keys(stats.languages).length} languages you've explored, {stats.topLanguage} stands above the rest.
          </p>
        </div>
      )
    },
    {
      id: 'archetype',
      content: (
        <div className="flex flex-col items-center text-center w-full max-w-md">
          <h2 className="text-2xl text-gray-400 font-bold mb-4 uppercase tracking-widest">Developer Archetype</h2>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-extrabold text-white mb-6"
          >
            {stats.archetype}
          </motion.div>
          <div className="glass-panel p-6 w-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-xl text-gray-300 relative z-10 leading-relaxed">
              "{stats.archetypeDescription}"
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'score',
      content: (
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-8">Developer Score</h2>
          <div className="relative flex items-center justify-center w-48 h-48 mb-6">
            <svg className="absolute w-full h-full -rotate-90">
              <circle cx="96" cy="96" r="88" className="stroke-gray-800" strokeWidth="12" fill="none" />
              <motion.circle 
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: `${(stats.score / 100) * 553} 1000` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                cx="96" cy="96" r="88" 
                className="stroke-github-accent" 
                strokeWidth="12" fill="none" strokeLinecap="round" 
              />
            </svg>
            <span className="text-6xl font-black text-white">{stats.score}</span>
          </div>
          <div className="text-2xl font-bold text-github-accent mb-2">Level {stats.level}: {stats.title}</div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setStage('dashboard');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-github-dark flex flex-col">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 z-50 flex gap-1 px-1">
        {slides.map((_, idx) => (
          <div key={idx} className="flex-1 h-full bg-gray-700 overflow-hidden relative rounded-full mt-2">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-white"
              initial={{ width: "0%" }}
              animate={{ width: idx < currentSlide ? "100%" : idx === currentSlide ? "100%" : "0%" }}
              transition={{ duration: idx === currentSlide ? 5 : 0.2, ease: "linear" }}
              onAnimationComplete={() => {
                if (idx === currentSlide) nextSlide();
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Overlays */}
      <div className="absolute inset-y-0 left-0 w-1/4 z-40 cursor-w-resize" onClick={prevSlide} />
      <div className="absolute inset-y-0 right-0 w-1/4 z-40 cursor-e-resize" onClick={nextSlide} />

      {/* Manual Skip/Next Button */}
      <button 
        onClick={() => setStage('dashboard')}
        className="absolute bottom-8 right-8 z-50 text-gray-400 hover:text-white flex items-center gap-2 font-medium"
      >
        Skip to Dashboard <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
