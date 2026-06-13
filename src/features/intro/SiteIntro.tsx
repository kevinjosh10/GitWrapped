import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { useWrappedStore } from '../../store/useWrappedStore';

export const SiteIntro: React.FC = () => {
  const setStage = useWrappedStore((state) => state.setStage);
  const [phase, setPhase] = useState<'black' | 'logo' | 'particles' | 'morph' | 'zoom'>('black');

  useEffect(() => {
    // Sequence orchestration
    const t1 = setTimeout(() => setPhase('logo'), 500);
    const t2 = setTimeout(() => setPhase('particles'), 2000);
    const t3 = setTimeout(() => setPhase('morph'), 4000);
    const t4 = setTimeout(() => setPhase('zoom'), 6000);
    const t5 = setTimeout(() => setStage('landing'), 7500);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, [setStage]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-[200]">
      
      <AnimatePresence>
        {/* Step 2: GitHub Logo Appears */}
        {(phase === 'logo' || phase === 'particles') && (
          <motion.div
            key="github-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute z-10 text-white flex flex-col items-center"
          >
            <Github className="w-32 h-32" />
          </motion.div>
        )}

        {/* Step 3-7: Particles emerge and swirl */}
        {phase === 'particles' && (
          <motion.div 
            key="particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 500, 
                  y: (Math.random() - 0.5) * 500,
                  scale: [0, Math.random() * 2 + 1, 0]
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute w-2 h-2 bg-github-accent rounded-full shadow-[0_0_10px_#58a6ff]"
              />
            ))}
          </motion.div>
        )}

        {/* Step 8-9: Morph into GITWRAPPED and glow */}
        {(phase === 'morph' || phase === 'zoom') && (
          <motion.div
            key="gitwrapped-logo"
            initial={{ opacity: 0, scale: 0.5, letterSpacing: "1em", filter: "blur(20px)" }}
            animate={
              phase === 'zoom' 
                ? { scale: 50, opacity: 0, filter: "blur(5px)" } 
                : { opacity: 1, scale: 1, letterSpacing: "0.1em", filter: "blur(0px)" }
            }
            transition={{ duration: phase === 'zoom' ? 1.5 : 2, ease: "easeInOut" }}
            className="absolute z-20 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 text-6xl md:text-8xl font-black tracking-tighter"
            style={{ textShadow: phase === 'morph' ? "0 0 40px rgba(255,255,255,0.8)" : "none" }}
          >
            GITWRAPPED
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button */}
      <button 
        onClick={() => setStage('landing')}
        className="absolute bottom-8 right-8 text-gray-500 hover:text-white transition-colors z-[210] font-medium"
      >
        Skip Intro
      </button>
    </div>
  );
};
