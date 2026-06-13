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

  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 1.5
    }));
  }, []);

  const text = "GITWRAPPED";

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50">
      
      {/* Hyperdrive / Zooming starfield effect */}
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 3, opacity: [0, 1, 0] }}
        transition={{ duration: 6, ease: "easeIn" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh`, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0], 
              scale: [0, p.size, p.size * 2],
              x: [`${p.x}vw`, `${p.x * 2}vw`],
              y: [`${p.y}vh`, `${p.y * 2}vh`]
            }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]"
          />
        ))}
      </motion.div>

      {/* Main Core Ring */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1, 4], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
        className="relative flex flex-col items-center z-10"
      >
        {/* Glowing Neural Network Rings */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute w-[600px] h-[600px] border-[2px] border-github-accent/20 rounded-full shadow-[0_0_50px_rgba(88,166,255,0.1)] blur-[2px]"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute w-[400px] h-[400px] border-[1px] border-purple-500/30 rounded-full shadow-[0_0_80px_rgba(168,85,247,0.2)]"
        />
        
        <div className="z-20 flex flex-col items-center">
          {/* Staggered Text Reveal */}
          <div className="flex overflow-hidden">
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5 + index * 0.1, 
                  ease: [0.2, 0.65, 0.3, 0.9] 
                }}
                className="text-white text-7xl md:text-8xl font-black tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,1)]"
              >
                {char}
              </motion.span>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: [0, 1, 0.5], letterSpacing: ["0.2em", "0.5em", "0.6em"] }}
            transition={{ duration: 5, delay: 1, ease: "easeOut" }}
            className="mt-6 text-github-accent text-xl font-medium uppercase drop-shadow-[0_0_15px_rgba(88,166,255,0.8)]"
          >
            Extracting DNA
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
