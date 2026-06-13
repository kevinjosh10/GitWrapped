import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { useWrappedStore } from '../../store/useWrappedStore';

export const SiteIntro: React.FC = () => {
  const setStage = useWrappedStore((state) => state.setStage);
  const [phase, setPhase] = useState<'black' | 'logo' | 'morph' | 'zoom'>('black');

  useEffect(() => {
    // Elegant, smooth timing sequence
    const t1 = setTimeout(() => setPhase('logo'), 500);
    const t2 = setTimeout(() => setPhase('morph'), 3000);
    const t3 = setTimeout(() => setPhase('zoom'), 5500);
    const t4 = setTimeout(() => setStage('landing'), 7000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [setStage]);

  return (
    <div className="fixed inset-0 bg-[#000000] flex items-center justify-center overflow-hidden z-[200]">
      <AnimatePresence>
        
        {/* Phase: GitHub Logo */}
        {phase === 'logo' && (
          <motion.div
            key="github-logo"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute z-10 text-white flex flex-col items-center"
          >
            <Github className="w-24 h-24" />
          </motion.div>
        )}

        {/* Phase: GITWRAPPED Text Morph & Glow */}
        {(phase === 'morph' || phase === 'zoom') && (
          <motion.div
            key="gitwrapped-logo"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={
              phase === 'zoom' 
                ? { scale: 30, opacity: 0, filter: "blur(2px)" } 
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ 
              duration: phase === 'zoom' ? 1.5 : 2, 
              ease: phase === 'zoom' ? "easeIn" : [0.16, 1, 0.3, 1] 
            }}
            className="absolute z-20 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-400 text-6xl md:text-8xl font-black tracking-tighter"
            style={{ 
              textShadow: phase === 'morph' ? "0 0 50px rgba(255,255,255,0.4)" : "none" 
            }}
          >
            GITWRAPPED
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Skip Button */}
      <button 
        onClick={() => setStage('landing')}
        className="absolute bottom-8 right-8 text-white/30 hover:text-white/80 transition-colors z-[210] font-medium text-sm tracking-wide"
      >
        Skip
      </button>
    </div>
  );
};
