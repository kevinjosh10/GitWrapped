import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWrappedStore } from '../../store/useWrappedStore';

export const CinematicIntro: React.FC = () => {
  const setStage = useWrappedStore((state) => state.setStage);

  useEffect(() => {
    // Automatically transition to the dashboard/story after the intro sequence
    const timer = setTimeout(() => {
      setStage('story');
    }, 5000); // 5 second intro

    return () => clearTimeout(timer);
  }, [setStage]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative flex flex-col items-center"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] border-[1px] border-white/5 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[300px] h-[300px] border-[1px] border-white/10 rounded-full"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 3] }}
          transition={{ duration: 4, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
          className="z-10 flex flex-col items-center"
        >
          <div className="text-white text-6xl font-bold tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
            GITWRAPPED
          </div>
          <div className="mt-4 text-gray-400 text-xl tracking-widest uppercase">
            Initializing Sequence
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
