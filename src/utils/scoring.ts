import { GitHubUser, GitHubRepo, ContributionsData } from '../services/github';
import { generateAIStats } from '../services/groq';

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

export async function calculateScoreAndArchetype(
  user: GitHubUser,
  repos: GitHubRepo[],
  contributions: ContributionsData
): Promise<DeveloperStats> {
  const totalContributions = contributions.totalContributions || 0;
  
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

  let topLanguage = 'Unknown';
  let maxCount = 0;
  Object.entries(languages).forEach(([lang, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topLanguage = lang;
    }
  });

  const rawMetrics = {
    totalContributions,
    totalStars,
    totalForks,
    reposWithDescriptions,
    totalSize,
    uniqueLanguages: Object.keys(languages).length,
    topLanguage,
    publicRepos: user.public_repos,
    followers: user.followers,
    hasBio: !!user.bio,
    hasLocation: !!user.location
  };

  // 1. Await AI Evaluation
  const aiStats = await generateAIStats(user.login, rawMetrics);

  // 2. Merge AI evaluated metrics with strict factual stats (to prevent hallucinations on raw counts)
  return {
    ...aiStats,
    topLanguage,
    languages,
    totalStars,
    totalForks
  };
}
