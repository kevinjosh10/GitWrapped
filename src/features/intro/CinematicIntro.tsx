import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useWrappedStore } from '../../store/useWrappedStore';

export const CinematicIntro: React.FC = () => {
  const setStage = useWrappedStore((state) => state.setStage);

  // Transition exactly at 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('story');
    }, 6000);
    return () => clearTimeout(timer);
  }, [setStage]);

  // Pre-calculate particle positions as numbers, not strings, to ensure Framer Motion handles them flawlessly
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 50 + 20;
      return {
        id: i,
        size: Math.random() * 3 + 2,
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        endX: Math.cos(angle) * (radius * 5),
        endY: Math.sin(angle) * (radius * 5),
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 1.5
      };
    });
  }, []);

  const text = "GITWRAPPED";

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-[100]">
      
      {/* Zooming Starfield Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: p.startX, y: p.startY, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 0], 
              x: p.endX,
              y: p.endY,
              scale: [0.5, p.size, p.size * 2]
            }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut", repeat: Infinity }}
            className="absolute bg-white rounded-full shadow-[0_0_8px_#fff]"
            style={{ width: 2, height: 2 }}
          />
        ))}
      </div>

      {/* Main Core */}
      <div className="relative flex flex-col items-center z-10 w-full h-full justify-center">
        {/* Glowing Rings */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ opacity: { duration: 1 }, scale: { duration: 1 }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
          className="absolute w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] border-2 border-github-accent/30 rounded-full shadow-[0_0_60px_rgba(88,166,255,0.15)]"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: -360 }}
          transition={{ opacity: { duration: 1, delay: 0.5 }, scale: { duration: 1, delay: 0.5 }, rotate: { duration: 15, repeat: Infinity, ease: "linear" } }}
          className="absolute w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] border border-purple-500/40 rounded-full shadow-[0_0_80px_rgba(168,85,247,0.25)]"
        />
        
        {/* Text Container */}
        <div className="z-20 flex flex-col items-center">
          <div className="flex overflow-hidden pb-4">
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 + index * 0.08, 
                  ease: "easeOut"
                }}
                className="text-white text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
              >
                {char}
              </motion.span>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5] }}
            transition={{ duration: 4, delay: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className="mt-4 text-github-accent text-lg sm:text-xl font-bold uppercase tracking-[0.4em] drop-shadow-[0_0_15px_rgba(88,166,255,0.8)]"
          >
            Extracting DNA
          </motion.div>
        </div>
      </div>
    </div>
  );
};
