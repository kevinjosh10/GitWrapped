import { DeveloperStats } from '../utils/scoring';
import { GitHubUser } from './github';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function generateGroqCompletion(systemPrompt: string, userPrompt: string): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API Key is missing. Please check your .env file.');
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 250,
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Groq API Error:', error);
    throw new Error('Failed to generate text from Groq.');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
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
