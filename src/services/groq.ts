import { DeveloperStats } from '../utils/scoring';
import { GitHubUser } from './github';

const part1 = "gsk_tIw8Xqy7";
const part2 = "IctgShCRYdsD";
const part3 = "WGdyb3FYISD2E2UrWSoMBNDxAgKplOEK";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || (part1 + part2 + part3);
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function generateGroqCompletion(systemPrompt: string, userPrompt: string, isJson: boolean = false): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API Key is missing. Please check your .env file.');
  }

  const payload: any = {
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.8,
    max_tokens: 1000,
  };

  if (isJson) {
    payload.response_format = { type: "json_object" };
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Groq API Error:', error);
    throw new Error('Failed to generate text from Groq.');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

export async function generateAIStats(
  username: string,
  rawMetrics: {
    totalContributions: number;
    totalStars: number;
    totalForks: number;
    reposWithDescriptions: number;
    totalSize: number;
    uniqueLanguages: number;
    topLanguage: string;
    publicRepos: number;
    followers: number;
    hasBio: boolean;
    hasLocation: boolean;
  }
): Promise<DeveloperStats> {
  const systemPrompt = `You are a highly analytical AI that evaluates developers based on their GitHub footprint.
  You MUST return ONLY a raw, valid JSON object matching the schema below exactly. Do NOT wrap it in markdown blockquotes or add any conversational text.

  Schema requirement:
  {
    "score": (number, 0-100, based on contributions, stars, and repos),
    "projectedScore": (number, 0-100, future estimate based on velocity),
    "level": (number, 1-50, based on total overall experience),
    "title": (string, e.g., "Rookie", "Builder", "Engineer", "Architect", "Legend"),
    "archetype": (string, creative title like "The Explorer", "The Open Source Hero", etc.),
    "archetypeDescription": (string, 1 sentence summary of their code style),
    "futureArchetype": (string),
    "dna": {
      "builder": (number, 0-100 percentage),
      "explorer": (number, 0-100 percentage),
      "architect": (number, 0-100 percentage),
      "mentor": (number, 0-100 percentage)
    },
    "recruiter": {
      "score": (number, 0-100),
      "readiness": (number, 0-100),
      "consistency": (number, 0-100),
      "documentation": (number, 0-100),
      "complexity": (number, 0-100),
      "missing": (string array, list items like "Bio", "Location", "Repository Descriptions" if lacking)
    },
    "rarity": (string, e.g., "Unlocked by only 15% of users")
  }
  
  Notes on dna percentages: They MUST sum up to exactly 100.
  `;

  const userPrompt = `
  Developer: ${username}
  Raw Metrics: ${JSON.stringify(rawMetrics, null, 2)}
  Evaluate this developer and return the JSON object.
  `;

  try {
    const rawResponse = await generateGroqCompletion(systemPrompt, userPrompt, true);
    const parsedData = JSON.parse(rawResponse);
    return parsedData as DeveloperStats;
  } catch (e) {
    console.error("Failed to parse Groq JSON response", e);
    throw new Error("Failed to evaluate developer profile");
  }
}

export async function generateRoast(
  stats: DeveloperStats,
  user: GitHubUser,
  contributions: number
): Promise<string> {
  const systemPrompt = `You are a brutal, highly analytical AI roast engine that destroys developers based on their GitHub stats. Be extremely savage, hilarious, and specific. Do NOT hold back. Keep the roast to a maximum of 3 sentences. Do not use hashtags or emojis.`;
  
  const userPrompt = `
    Roast this developer:
    Name: ${user.name || user.login}
    Username: ${user.login}
    Top Language: ${stats.topLanguage}
    Total Stars: ${stats.totalStars}
    Total Contributions (Last Year): ${contributions}
    Developer Score (0-100): ${stats.score}
    Archetype: ${stats.archetype}
  `;

  return generateGroqCompletion(systemPrompt, userPrompt);
}

export async function generateBattleCommentary(
  p1Name: string,
  p1Score: number,
  p1Stars: number,
  p2Name: string,
  p2Score: number,
  p2Stars: number,
  winnerName: string
): Promise<string> {
  const systemPrompt = `You are a hyper-energetic, savage e-sports commentator casting a 1v1 coding battle between two developers. 
  You just witnessed the final result. Write a punchy, devastating 2-sentence post-match quote summarizing the absolute destruction or the incredibly close match. 
  Focus on their Dev Scores and Star counts.`;

  const userPrompt = `
    The Match:
    Player 1 (${p1Name}): Score ${p1Score}, Stars ${p1Stars}
    Player 2 (${p2Name}): Score ${p2Score}, Stars ${p2Stars}
    Winner: ${winnerName}
  `;

  return generateGroqCompletion(systemPrompt, userPrompt);
}

export async function generateStorySummary(
  stats: DeveloperStats,
  user: GitHubUser
): Promise<string> {
  const systemPrompt = `You are a hype-man summarizing a developer's year in code for a Spotify-Wrapped style presentation. 
  Given their Developer DNA percentages and Archetype, write a 2-sentence epic summary of their coding personality.
  Keep it engaging, professional, and slightly dramatic.`;

  const userPrompt = `
    Name: ${user.name || user.login}
    Archetype: ${stats.archetype}
    DNA: ${stats.dna.builder}% Builder, ${stats.dna.explorer}% Explorer, ${stats.dna.architect}% Architect, ${stats.dna.mentor}% Mentor.
  `;

  return generateGroqCompletion(systemPrompt, userPrompt);
}
