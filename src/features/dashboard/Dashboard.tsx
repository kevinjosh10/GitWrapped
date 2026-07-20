import React from 'react';
import { useWrappedStore } from '../../store/useWrappedStore';
import { motion } from 'framer-motion';
import { Github, Orbit, Swords, Flame, Download, X } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { generateRoast } from '../../services/groq';
import { RecruiterView } from './RecruiterView';
import { YearlyExport } from '../wrapped/YearlyExport';

export const Dashboard: React.FC = () => {
  const { userData, stats, contributions, setStage, reset } = useWrappedStore();

  if (!userData || !stats || !contributions) return null;

  const [currentRoast, setCurrentRoast] = React.useState('');
  const [isGeneratingRoast, setIsGeneratingRoast] = React.useState(false);
  const [showBattleModal, setShowBattleModal] = React.useState(false);
  const [battleOpponent, setBattleOpponent] = React.useState('');

  React.useEffect(() => {
    let mounted = true;
    const fetchInitialRoast = async () => {
      if (stats && userData && contributions && !currentRoast && !isGeneratingRoast) {
        setIsGeneratingRoast(true);
        try {
          const roast = await generateRoast(stats, userData, contributions.totalContributions);
          if (mounted) setCurrentRoast(roast);
        } catch (e) {
          if (mounted) setCurrentRoast("AI Roast Engine is cooling down. Too much heat.");
        } finally {
          if (mounted) setIsGeneratingRoast(false);
        }
      }
    };
    fetchInitialRoast();
    return () => { mounted = false; };
  }, [stats, userData, contributions]);

  // Flatten contribution data for chart
  const chartData = contributions.weeks.flatMap(week => week.contributionDays).slice(-90); // last 90 days

  const handleGenerateRoast = async () => {
    setIsGeneratingRoast(true);
    try {
      const roast = await generateRoast(stats!, userData!, contributions!.totalContributions);
      setCurrentRoast(roast);
    } catch (e) {
      setCurrentRoast("Groq API limits reached, or it refuses to roast someone this average again.");
    } finally {
      setIsGeneratingRoast(false);
    }
  };

  const handleBattle = (e: React.FormEvent) => {
    e.preventDefault();
    if (battleOpponent.trim()) {
      // Transition to battle screen
      setStage('battle');
      // Pass battleOpponent to store via a new method (to be implemented)
      useWrappedStore.getState().startBattle(battleOpponent.trim());
    }
  };

  return (
    <div className="min-h-screen bg-github-dark text-white p-6 pb-24">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-12">
        <div className="flex items-center gap-3 cursor-pointer" onClick={reset}>
          <Github className="w-8 h-8" />
          <span className="text-xl font-bold">GitWrapped</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setStage('galaxy')} className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-github-accent transition-colors">
            <Orbit className="w-4 h-4 text-purple-400" /> Galaxy
          </button>
          <button onClick={() => setShowBattleModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-red-500 hover:text-red-400 transition-colors">
            <Swords className="w-4 h-4 text-red-400" /> Battle
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Trading Card */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-1 rounded-2xl bg-gradient-to-br from-[#30363d] to-black"
          >
            <div className="bg-[#0d1117] rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-github-accent/20 to-transparent" />
              
              <img src={userData.avatar_url} alt={userData.login} className="w-32 h-32 rounded-full border-4 border-[#30363d] relative z-10 mb-4 shadow-2xl" />
              <h2 className="text-2xl font-bold relative z-10">{userData.name || userData.login}</h2>
              <p className="text-gray-400 mb-6 relative z-10">@{userData.login}</p>
              
              <div className="w-full bg-[#161b22] rounded-lg p-4 mb-4 border border-[#30363d]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm font-bold tracking-wider uppercase">Level {stats.level}</span>
                  <span className="text-github-accent font-bold">{stats.title}</span>
                </div>
                <div className="w-full bg-black rounded-full h-2">
                  <div className="bg-github-accent h-2 rounded-full" style={{ width: `${stats.score}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full text-center mb-6">
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">{stats.score}</div>
                  <div className="text-xs text-gray-400 uppercase">Dev Score</div>
                </div>
                <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">{stats.topLanguage}</div>
                  <div className="text-xs text-gray-400 uppercase">Top Lang</div>
                </div>
              </div>

              <div className="w-full">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold text-center">Archetype</div>
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-300 rounded-lg p-3 text-center font-semibold mb-1">
                  {stats.archetype}
                </div>
                <div className="text-[10px] text-gray-500 text-center font-bold">{stats.rarity}</div>
              </div>

              <div className="w-full mt-4">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold text-center">Developer DNA</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-center font-bold">
                  <div className="bg-[#161b22] border border-[#30363d] p-2 rounded text-blue-400">Builder: {stats.dna.builder}%</div>
                  <div className="bg-[#161b22] border border-[#30363d] p-2 rounded text-green-400">Explorer: {stats.dna.explorer}%</div>
                  <div className="bg-[#161b22] border border-[#30363d] p-2 rounded text-purple-400">Architect: {stats.dna.architect}%</div>
                  <div className="bg-[#161b22] border border-[#30363d] p-2 rounded text-yellow-400">Mentor: {stats.dna.mentor}%</div>
                </div>
              </div>

              <div className="w-full mt-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="text-xs text-blue-400 uppercase tracking-widest mb-2 font-bold text-center">1-Year Forecast Predictor</div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-300">Projected Score</span>
                  <span className="font-black text-white">{stats.projectedScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Future Archetype</span>
                  <span className="font-black text-blue-400">{stats.futureArchetype}</span>
                </div>
              </div>

              <button className="mt-6 w-full py-3 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4" /> Export Card
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Analytics & Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-panel p-4 flex flex-col justify-center">
              <span className="text-gray-400 text-sm font-semibold mb-1">Repositories</span>
              <span className="text-2xl font-bold">{userData.public_repos}</span>
            </div>
            <div className="glass-panel p-4 flex flex-col justify-center">
              <span className="text-gray-400 text-sm font-semibold mb-1">Total Stars</span>
              <span className="text-2xl font-bold text-yellow-400">{stats.totalStars}</span>
            </div>
            <div className="glass-panel p-4 flex flex-col justify-center">
              <span className="text-gray-400 text-sm font-semibold mb-1">Contributions</span>
              <span className="text-2xl font-bold text-green-400">{contributions.totalContributions}</span>
            </div>
            <div className="glass-panel p-4 flex flex-col justify-center">
              <span className="text-gray-400 text-sm font-semibold mb-1">Followers</span>
              <span className="text-2xl font-bold text-blue-400">{userData.followers}</span>
            </div>
          </div>

          {/* Activity Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6"
          >
            <h3 className="text-lg font-bold mb-6">90-Day Contribution Activity</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#238636" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#238636" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#238636', fontWeight: 'bold' }}
                    labelStyle={{ color: '#8b949e', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="contributionCount" stroke="#238636" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Languages & Roast Mode Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6"
            >
              <h3 className="text-lg font-bold mb-4">Language DNA</h3>
              <div className="flex flex-col gap-3">
                {Object.entries(stats.languages)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([lang, count]) => (
                    <div key={lang} className="flex items-center justify-between">
                      <span className="text-gray-300">{lang}</span>
                      <div className="flex-1 mx-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-github-accent rounded-full" 
                          style={{ width: `${(count / Object.values(stats.languages).reduce((a, b) => a + b, 0)) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-6 bg-gradient-to-br from-[#161b22] to-red-900/10 border-red-500/20 relative overflow-hidden group"
            >
              <div className="absolute top-2 right-2 text-red-500/20 group-hover:text-red-500/40 transition-colors">
                <Flame className="w-24 h-24" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-red-400 relative z-10 flex items-center gap-2">
                <Flame className="w-5 h-5" /> AI Roast Mode
              </h3>
              <p className="text-gray-300 relative z-10 text-sm leading-relaxed mb-4 italic min-h-[60px]">
                {isGeneratingRoast ? (
                  <span className="flex items-center gap-2 animate-pulse text-red-400">
                    <Flame className="w-4 h-4" /> Groq AI is analyzing your terrible code...
                  </span>
                ) : (
                  `"${currentRoast}"`
                )}
              </p>
              <button 
                onClick={handleGenerateRoast} 
                disabled={isGeneratingRoast}
                className="text-sm font-semibold text-red-400 hover:text-red-300 relative z-10 flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate new roast
              </button>
            </motion.div>
          </div>

          {/* Recruiter View & Export Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            <div className="lg:col-span-2">
              <RecruiterView />
            </div>
            <div className="lg:col-span-2">
              <YearlyExport />
            </div>
          </div>

        </div>
      </main>

      {/* Battle Modal */}
      {showBattleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#161b22] border border-red-500/30 p-8 rounded-2xl w-full max-w-md relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            <button onClick={() => setShowBattleModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <Swords className="w-6 h-6 text-red-500" /> Git Battle
            </h3>
            <p className="text-gray-400 mb-6">Enter a GitHub username to challenge them to a stats battle. The algorithm will decide the ultimate developer.</p>
            
            <form onSubmit={handleBattle} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Opponent's Username" 
                value={battleOpponent}
                onChange={(e) => setBattleOpponent(e.target.value)}
                className="bg-black border border-[#30363d] focus:border-red-500 text-white px-4 py-3 rounded-lg outline-none transition-colors"
                autoFocus
              />
              <button 
                type="submit" 
                disabled={!battleOpponent.trim()}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                FIGHT!
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
