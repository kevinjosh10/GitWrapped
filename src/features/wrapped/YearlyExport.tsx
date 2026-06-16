import React from 'react';
import { useWrappedStore } from '../../store/useWrappedStore';
import { Github, Download, Star, Code, GitCommit } from 'lucide-react';

export const YearlyExport: React.FC = () => {
  const { userData, stats, contributions } = useWrappedStore();

  if (!userData || !stats || !contributions) return null;

  return (
    <div className="glass-panel p-6 bg-gradient-to-br from-purple-900/20 to-black relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-full flex justify-between items-start mb-8">
          <Github className="w-8 h-8 text-white" />
          <div className="text-right">
            <p className="text-xs text-purple-400 font-bold tracking-widest uppercase">GitWrapped 2026</p>
            <h2 className="text-xl font-black text-white">@{userData.login}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-[#161b22]/80 backdrop-blur border border-purple-500/20 rounded-xl p-4 flex flex-col">
            <GitCommit className="w-5 h-5 text-purple-400 mb-2" />
            <span className="text-2xl font-black text-white">{contributions.totalContributions}</span>
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Commits</span>
          </div>
          <div className="bg-[#161b22]/80 backdrop-blur border border-yellow-500/20 rounded-xl p-4 flex flex-col">
            <Star className="w-5 h-5 text-yellow-400 mb-2" />
            <span className="text-2xl font-black text-white">{stats.totalStars}</span>
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Stars</span>
          </div>
          <div className="bg-[#161b22]/80 backdrop-blur border border-blue-500/20 rounded-xl p-4 flex flex-col col-span-2">
            <Code className="w-5 h-5 text-blue-400 mb-2" />
            <div className="flex justify-between items-end">
              <div>
                <span className="text-3xl font-black text-white">{stats.topLanguage}</span>
                <span className="block text-xs text-gray-400 uppercase font-bold tracking-wider">Top Language</span>
              </div>
              <div className="text-right">
                <span className="block text-xl font-black text-blue-400">{stats.score}</span>
                <span className="text-xs text-gray-400 uppercase font-bold">Dev Score</span>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
          <Download className="w-4 h-4" /> Export Story
        </button>
      </div>
    </div>
  );
};
