import React from 'react';
import { motion } from 'framer-motion';
import { useWrappedStore } from '../../store/useWrappedStore';
import { Briefcase, CheckCircle2, AlertCircle } from 'lucide-react';

export const RecruiterView: React.FC = () => {
  const { stats } = useWrappedStore();

  if (!stats) return null;

  const { recruiter } = stats;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 bg-gradient-to-br from-[#161b22] to-blue-900/10 border-blue-500/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold">Recruiter Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col: Recruiter Score */}
        <div>
          <h4 className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-4">Core Competencies</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Consistency</span>
                <span className="font-bold">{recruiter.consistency}/100</span>
              </div>
              <div className="w-full bg-black rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${recruiter.consistency}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Documentation</span>
                <span className="font-bold">{recruiter.documentation}/100</span>
              </div>
              <div className="w-full bg-black rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${recruiter.documentation}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Project Complexity</span>
                <span className="font-bold">{recruiter.complexity}/100</span>
              </div>
              <div className="w-full bg-black rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${recruiter.complexity}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Portfolio Readiness */}
        <div className="bg-[#0d1117] rounded-xl p-5 border border-[#30363d]">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm text-gray-400 uppercase font-bold tracking-widest">Portfolio Readiness</h4>
            <span className={`font-black text-xl ${recruiter.readiness >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
              {recruiter.readiness}%
            </span>
          </div>

          {recruiter.missing.length === 0 ? (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Your profile is highly optimized for recruiters!</span>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-400 mb-3">Missing elements holding you back:</p>
              <ul className="space-y-2">
                {recruiter.missing.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-yellow-400/90 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
