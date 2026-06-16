import { GitHubUser, GitHubRepo, ContributionsData } from '../services/github';

export interface DeveloperDNA {
  builder: number;
  explorer: number;
  architect: number;
  mentor: number;
}

export interface RecruiterScore {
  score: number;
  readiness: number;
  consistency: number;
  documentation: number;
  complexity: number;
  missing: string[];
}

export interface DeveloperStats {
  score: number;
  projectedScore: number;
  level: number;
  title: string;
  archetype: string;
  archetypeDescription: string;
  futureArchetype: string;
  topLanguage: string;
  languages: Record<string, number>;
  totalStars: number;
  totalForks: number;
  dna: DeveloperDNA;
  recruiter: RecruiterScore;
  rarity: string;
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
  
  // 1. Activity
  const totalContributions = contributions.totalContributions || 0;
  score += Math.min(40, (totalContributions / 2000) * 40);

  // 2. Repository Quality
  let totalStars = 0;
  let totalForks = 0;
  let reposWithDescriptions = 0;
  let totalSize = 0;
  const languages: Record<string, number> = {};

  repos.forEach(repo => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    totalSize += repo.size;
    if (repo.description) reposWithDescriptions++;
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  score += Math.min(40, (totalStars / 500) * 40);

  // 3. Consistency
  score += Math.min(20, (user.public_repos / 50) * 20);

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

  // Calculate DNA
  const rawBuilder = Math.min(100, (totalContributions / 1000) * 100);
  const rawExplorer = Math.min(100, (uniqueLangs / 10) * 100);
  const rawArchitect = Math.min(100, (totalSize / 10000) * 100); // 10000 KB
  const rawMentor = Math.min(100, ((user.followers + totalForks) / 50) * 100);
  
  const totalRaw = rawBuilder + rawExplorer + rawArchitect + rawMentor || 1;
  const dna: DeveloperDNA = {
    builder: Math.round((rawBuilder / totalRaw) * 100),
    explorer: Math.round((rawExplorer / totalRaw) * 100),
    architect: Math.round((rawArchitect / totalRaw) * 100),
    mentor: Math.round((rawMentor / totalRaw) * 100),
  };

  // Predictor
  const projectedScore = Math.floor(Math.min(100, score + Math.max(5, (totalContributions / 500) * 10)));
  const futureArchetype = projectedScore > 90 ? 'The Architect' : (uniqueLangs > 5 ? 'The Explorer' : 'The Builder');

  // Recruiter Score
  const consistency = Math.min(100, Math.floor((totalContributions / 1500) * 100));
  const documentation = repos.length > 0 ? Math.floor((reposWithDescriptions / repos.length) * 100) : 0;
  const complexity = Math.min(100, Math.floor((totalSize / 50000) * 100) + Math.min(50, totalStars * 2));
  const recruiterScoreVal = Math.floor((consistency + documentation + complexity) / 3);

  const missing: string[] = [];
  if (!user.bio) missing.push('Profile Bio');
  if (!user.location) missing.push('Location');
  if (documentation < 50) missing.push('Repository Descriptions');
  if (repos.length < 3) missing.push('Public Projects');

  const readiness = Math.max(0, 100 - (missing.length * 20));

  const recruiter: RecruiterScore = {
    score: recruiterScoreVal,
    consistency,
    documentation,
    complexity,
    readiness,
    missing
  };

  // Rarity
  let rarity = 'Unlocked by 45% of users';
  if (score > 90) rarity = 'Unlocked by only 3% of users';
  else if (score > 70) rarity = 'Unlocked by only 15% of users';
  else if (score > 50) rarity = 'Unlocked by 30% of users';

  return {
    score,
    projectedScore,
    level,
    title,
    archetype: archetype.name,
    archetypeDescription: archetype.desc,
    futureArchetype,
    topLanguage,
    languages,
    totalStars,
    totalForks,
    dna,
    recruiter,
    rarity
  };
}
