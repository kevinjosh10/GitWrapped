import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWrappedStore } from '../../store/useWrappedStore';
import { Github } from 'lucide-react';

export const CinematicIntro: React.FC = () => {
  const setStage = useWrappedStore((state) => state.setStage);
  const [phase, setPhase] = useState(0);

  const texts = [
    "Analyzing DNA...",
    "Compiling History...",
    "Profile Reconstructed."
  ];

  useEffect(() => {
    // 6-second total sequence
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 4000);
    const t3 = setTimeout(() => setStage('story'), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [setStage]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center overflow-hidden z-[100]">
      
      {/* Immersive Animated Gradient Background */}
      <motion.div 
        animate={{ 
          background: [
            "radial-gradient(circle at 50% 50%, rgba(88,166,255,0.1) 0%, rgba(0,0,0,1) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, rgba(0,0,0,1) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.1) 0%, rgba(0,0,0,1) 100%)"
          ]
        }}
        transition={{ duration: 6, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Pulsing GitHub Logo */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <Github className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
        </motion.div>

        {/* Morphing Text Sequence */}
        <div className="h-16 relative w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={phase}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 whitespace-nowrap"
            >
              {texts[phase]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-900 rounded-full mt-12 overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          />
        </div>
      </div>
    </div>
  );
};
