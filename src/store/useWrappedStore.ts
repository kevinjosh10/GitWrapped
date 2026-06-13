import { create } from 'zustand';
import { fetchUserProfile, fetchTopRepositories, fetchContributions, GitHubUser, GitHubRepo, ContributionsData } from '../services/github';
import { calculateScoreAndArchetype, DeveloperStats } from '../utils/scoring';

export type AppStage = 'site-intro' | 'landing' | 'analyzing' | 'intro' | 'dashboard' | 'story' | 'galaxy' | 'battle';

interface WrappedState {
  stage: AppStage;
  username: string | null;
  userData: GitHubUser | null;
  repos: GitHubRepo[];
  contributions: ContributionsData | null;
  stats: DeveloperStats | null;
  error: string | null;

  // Battle State
  challengerUsername: string | null;
  challengerData: GitHubUser | null;
  challengerStats: DeveloperStats | null;
  battleError: string | null;
  
  setStage: (stage: AppStage) => void;
  setUsername: (username: string) => void;
  analyzeProfile: (username: string) => Promise<void>;
  startBattle: (challengerUsername: string) => Promise<void>;
  reset: () => void;
}

export const useWrappedStore = create<WrappedState>((set) => ({
  stage: 'landing',
  username: null,
  userData: null,
  repos: [],
  contributions: null,
  stats: null,
  error: null,

  challengerUsername: null,
  challengerData: null,
  challengerStats: null,
  battleError: null,

  setStage: (stage) => set({ stage }),
  
  setUsername: (username) => set({ username }),

  analyzeProfile: async (username) => {
    set({ stage: 'analyzing', error: null, username });
    try {
      const [userData, repos, contributions] = await Promise.all([
        fetchUserProfile(username),
        fetchTopRepositories(username, 60), // Cap at 60 as requested to avoid rate limits
        fetchContributions(username)
      ]);

      const stats = calculateScoreAndArchetype(userData, repos, contributions);

      set({
        userData,
        repos,
        contributions,
        stats,
        stage: 'intro' // After fetching, transition to the cinematic intro
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to analyze profile', stage: 'landing' });
    }
  },

  startBattle: async (challengerUsername) => {
    set({ battleError: null, challengerUsername });
    try {
      const [userData, repos, contributions] = await Promise.all([
        fetchUserProfile(challengerUsername),
        fetchTopRepositories(challengerUsername, 60),
        fetchContributions(challengerUsername)
      ]);

      const stats = calculateScoreAndArchetype(userData, repos, contributions);

      set({
        challengerData: userData,
        challengerStats: stats,
      });
    } catch (err: any) {
      set({ battleError: err.message || 'Failed to analyze challenger', stage: 'dashboard' });
    }
  },

  reset: () => set({
    stage: 'landing',
    username: null,
    userData: null,
    repos: [],
    contributions: null,
    stats: null,
    error: null,
    challengerUsername: null,
    challengerData: null,
    challengerStats: null,
    battleError: null,
  })
}));
