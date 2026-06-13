import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { useWrappedStore } from '../../store/useWrappedStore';

export const SiteIntro: React.FC = () => {
  const setStage = useWrappedStore((state) => state.setStage);

  useEffect(() => {
    // Total animation duration is 7 seconds, then transition
    const timer = setTimeout(() => setStage('landing'), 7000);
    return () => clearTimeout(timer);
  }, [setStage]);

  return (
    <div className="fixed inset-0 bg-[#000000] flex items-center justify-center overflow-hidden z-[200]">
      
      {/* GitHub Logo Animation Sequence */}
      {/* Timeline: 
          0.0 -> 0.15: Fade In
          0.15 -> 0.45: Hold
          0.45 -> 0.65: Fade Out & Scale Up (Morph out)
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 1, 1, 0, 0], 
          scale: [0.8, 1, 1, 1.5, 1.5]
        }}
        transition={{ 
          duration: 7, 
          times: [0, 0.15, 0.45, 0.65, 1], 
          ease: "easeInOut" 
        }}
        className="absolute z-10 text-white flex flex-col items-center"
      >
        <Github className="w-24 h-24" />
      </motion.div>

      {/* GITWRAPPED Text Animation Sequence */}
      {/* Timeline:
          0.0 -> 0.45: Hidden
          0.45 -> 0.65: Fade In & Scale Normal (Morph in synchronously)
          0.65 -> 0.8: Hold
          0.8 -> 1.0: Zoom through camera
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 0, 1, 1, 0], 
          scale: [0.5, 0.5, 1, 1, 40]
        }}
        transition={{ 
          duration: 7, 
          times: [0, 0.45, 0.65, 0.8, 1], 
          ease: [0.25, 0.1, 0.25, 1] 
        }}
        className="absolute z-20 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-400 text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter"
      >
        GITWRAPPED
      </motion.div>

      {/* Skip Button */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => setStage('landing')}
        className="absolute bottom-8 right-8 text-white/30 hover:text-white/80 transition-colors z-[210] font-medium text-sm tracking-wide"
      >
        Skip
      </motion.button>
    </div>
  );
};
