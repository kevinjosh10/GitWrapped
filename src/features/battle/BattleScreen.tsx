import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWrappedStore } from '../../store/useWrappedStore';
import { Swords, Trophy, XCircle, ArrowLeft } from 'lucide-react';

export const BattleScreen: React.FC = () => {
  const { userData, stats, challengerData, challengerStats, battleError, setStage } = useWrappedStore();
  const [phase, setPhase] = useState<'loading' | 'clash' | 'stats' | 'winner'>('loading');

  useEffect(() => {
    if (challengerData && challengerStats) {
      // Sequence
      const t1 = setTimeout(() => setPhase('clash'), 500);
      const t2 = setTimeout(() => setPhase('stats'), 3500);
      const t3 = setTimeout(() => setPhase('winner'), 6000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [challengerData, challengerStats]);

  if (battleError) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Battle Failed</h2>
        <p className="text-gray-400 mb-6">{battleError}</p>
        <button onClick={() => setStage('dashboard')} className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (phase === 'loading' || !challengerData || !challengerStats) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Swords className="w-12 h-12" />
        </motion.div>
        <h2 className="mt-4 text-xl font-bold font-mono tracking-widest uppercase">Summoning Challenger...</h2>
      </div>
    );
  }

  // Determine winner and generate dynamic comment
  const p1Score = stats!.score;
  const p2Score = challengerStats.score;
  const winner = p1Score >= p2Score ? 'p1' : 'p2';
  
  const generateBattleCommentary = () => {
    const diff = Math.abs(p1Score - p2Score);
    if (diff < 50) return "A ridiculously close match! Practically cloned DNA.";
    if (diff > 500) return "Absolute massacre. Was the other player even typing?";
    
    if (winner === 'p1') {
      if (stats!.totalStars > challengerStats.totalStars * 2) return `They tried, but ${userData!.login}'s star power was just too overwhelming.`;
      return `${userData!.login} outcoded them in plain sight. Superior mechanics.`;
    } else {
      if (challengerStats.totalStars > stats!.totalStars * 2) return `We witnessed a masterclass. ${challengerData.login}'s repos are built different.`;
      return `A tough loss for Player 1. ${challengerData.login} simply had better commit discipline.`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden flex flex-col z-[100]">
      {/* Background split */}
      <div className="absolute inset-0 flex">
        <div className={`w-1/2 h-full transition-colors duration-1000 ${phase === 'winner' && winner === 'p1' ? 'bg-blue-900/40' : 'bg-[#0d1117]'}`} />
        <div className={`w-1/2 h-full transition-colors duration-1000 ${phase === 'winner' && winner === 'p2' ? 'bg-red-900/40' : 'bg-[#161b22]'}`} />
      </div>

      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => setStage('dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Flee Battle
        </button>
      </div>

      {/* CLASH PHASE */}
      {phase === 'clash' && (
        <motion.div className="absolute inset-0 flex items-center justify-center z-40">
          <motion.div 
            initial={{ scale: 5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="text-9xl md:text-[200px] font-black italic text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-yellow-500 drop-shadow-[0_0_50px_rgba(239,68,68,0.8)]"
          >
            VS
          </motion.div>
        </motion.div>
      )}

      <div className="relative z-10 flex-1 flex">
        {/* PLAYER 1 (Current User) */}
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="w-1/2 flex flex-col items-center justify-center p-8 border-r border-gray-800"
        >
          <img src={userData!.avatar_url} alt={userData!.login} className={`w-32 h-32 md:w-48 md:h-48 rounded-full border-4 ${phase === 'winner' && winner === 'p1' ? 'border-blue-400 shadow-[0_0_50px_rgba(96,165,250,0.6)]' : 'border-[#30363d]'} mb-6 object-cover`} />
          <h2 className="text-2xl md:text-4xl font-black mb-2 text-center">{userData!.login}</h2>
          <div className="text-blue-400 font-bold uppercase tracking-widest mb-12">Player 1</div>

          {(phase === 'stats' || phase === 'winner') && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">DEV SCORE</span><span className="font-bold">{p1Score}</span></div>
                <div className="h-3 w-full bg-gray-900 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${Math.min(100, (p1Score/1000)*100)}%` }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">STARS</span><span className="font-bold">{stats!.totalStars}</span></div>
                <div className="h-3 w-full bg-gray-900 rounded-full overflow-hidden"><div className="h-full bg-blue-400" style={{ width: `${Math.min(100, (stats!.totalStars/500)*100)}%` }} /></div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* PLAYER 2 (Challenger) */}
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="w-1/2 flex flex-col items-center justify-center p-8"
        >
          <img src={challengerData.avatar_url} alt={challengerData.login} className={`w-32 h-32 md:w-48 md:h-48 rounded-full border-4 ${phase === 'winner' && winner === 'p2' ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6)]' : 'border-[#30363d]'} mb-6 object-cover`} />
          <h2 className="text-2xl md:text-4xl font-black mb-2 text-center">{challengerData.login}</h2>
          <div className="text-red-500 font-bold uppercase tracking-widest mb-12">Challenger</div>

          {(phase === 'stats' || phase === 'winner') && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">DEV SCORE</span><span className="font-bold">{p2Score}</span></div>
                <div className="h-3 w-full bg-gray-900 rounded-full overflow-hidden flex justify-end"><div className="h-full bg-red-600" style={{ width: `${Math.min(100, (p2Score/1000)*100)}%` }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">STARS</span><span className="font-bold">{challengerStats.totalStars}</span></div>
                <div className="h-3 w-full bg-gray-900 rounded-full overflow-hidden flex justify-end"><div className="h-full bg-red-500" style={{ width: `${Math.min(100, (challengerStats.totalStars/500)*100)}%` }} /></div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* WINNER OVERLAY */}
      {phase === 'winner' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-black/80 backdrop-blur-xl border-t border-b border-yellow-500/50 py-6 px-12 text-center shadow-[0_0_100px_rgba(234,179,8,0.2)] w-full flex flex-col items-center">
            <Trophy className="w-16 h-16 text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 mb-2">
              {winner === 'p1' ? userData!.login : challengerData.login} WINS
            </h1>
            <p className="text-xl text-gray-300 font-medium mb-4">
              Flawless Victory. Superior Developer DNA detected.
            </p>
            <div className="bg-black/50 border border-yellow-500/30 rounded-lg p-4 max-w-lg">
              <p className="text-yellow-200/80 italic font-mono text-sm">
                " {generateBattleCommentary()} "
              </p>
            </div>
            
            <button 
              onClick={() => setStage('dashboard')}
              className="mt-8 px-8 py-3 bg-white text-black font-black uppercase rounded-full pointer-events-auto hover:bg-gray-200 transition-colors"
            >
              Return to Base
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
