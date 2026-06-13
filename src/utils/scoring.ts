import { GitHubUser, GitHubRepo, ContributionsData } from '../services/github';

export interface DeveloperStats {
  score: number;
  level: number;
  title: string;
  archetype: string;
  archetypeDescription: string;
  topLanguage: string;
  languages: Record<string, number>;
  totalStars: number;
  totalForks: number;
}

const ARCHETYPES = {
  BUILDER: { name: 'The Builder', desc: 'Consistent, relentless, turning coffee into code.' },
  EXPLORER: { name: 'The Explorer', desc: 'Constantly trying new languages and frameworks.' },
  ARCHITECT: { name: 'The Architect', desc: 'Focuses on complex, highly-starred repositories.' },
  OPEN_SOURCE_HERO: { name: 'Open Source Hero', desc: 'Making the developer world better for everyone.' },
  SPECIALIST: { name: 'The Specialist', desc: 'Mastering a single domain with incredible depth.' },
};

export function calculateScoreAndArchetype(
  user: GitHubUser,
  repos: GitHubRepo[],
  contributions: ContributionsData
): DeveloperStats {
  let score = 0;
  
  // 1. Activity (Max 40 points)
  const totalContributions = contributions.totalContributions || 0;
  score += Math.min(40, (totalContributions / 2000) * 40);

  // 2. Repository Quality (Max 40 points)
  let totalStars = 0;
  let totalForks = 0;
  const languages: Record<string, number> = {};

  repos.forEach(repo => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  score += Math.min(40, (totalStars / 500) * 40);

  // 3. Consistency (Max 20 points)
  // Approximated by public repos and follower ratio
  score += Math.min(20, (user.public_repos / 50) * 20);

  // Cap at 100
  score = Math.floor(Math.min(100, Math.max(0, score)));

  // Calculate Level
  const level = Math.max(1, Math.floor(Math.sqrt(totalContributions / 50) + (totalStars / 10)));
  let title = 'Rookie';
  if (level >= 5) title = 'Builder';
  if (level >= 10) title = 'Engineer';
  if (level >= 20) title = 'Architect';
  if (level >= 50) title = 'Legend';

  // Determine Top Language
  let topLanguage = 'Unknown';
  let maxCount = 0;
  Object.entries(languages).forEach(([lang, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topLanguage = lang;
    }
  });

  // Determine Archetype
  let archetype = ARCHETYPES.BUILDER;
  const uniqueLangs = Object.keys(languages).length;

  if (totalStars > 1000) archetype = ARCHETYPES.OPEN_SOURCE_HERO;
  else if (uniqueLangs > 7) archetype = ARCHETYPES.EXPLORER;
  else if (totalStars / Math.max(1, repos.length) > 50) archetype = ARCHETYPES.ARCHITECT;
  else if (uniqueLangs <= 2 && repos.length > 10) archetype = ARCHETYPES.SPECIALIST;

  return {
    score,
    level,
    title,
    archetype: archetype.name,
    archetypeDescription: archetype.desc,
    topLanguage,
    languages,
    totalStars,
    totalForks
  };
}
