<div align="center">

<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="100" height="100" alt="GitHub Logo" />

# 🎸 GitWrapped

**Your GitHub tells a story. We make it cinematic.**

[![Deploy to GitHub Pages](https://github.com/kevinjosh10/GitWrapped/actions/workflows/deploy.yml/badge.svg)](https://github.com/kevinjosh10/GitWrapped/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

[**✨ Experience the Live Demo ✨**](https://kevinjosh10.github.io/GitWrapped/)

<br />
</div>

---

## ⚡ Overview

**GitWrapped** is not just another analytics dashboard. It is a fully client-side, highly animated visual journey that transforms raw GitHub statistics into a "Spotify Wrapped" style cinematic experience. 

Built for developers who care about aesthetics, GitWrapped analyzes your code footprint, extracts your **Developer DNA**, predicts your future growth, and allows you to battle other developers in a Street-Fighter style arena.

---

## 💎 Premium Features

### 🎬 The Cinematic Story
Experience your GitHub data like an Apple Keynote. A deeply immersive, 60fps slide-based sequence reveals your top languages, contribution volume, and crowns you with a **Developer Archetype** (e.g., *The Explorer*, *The Open Source Hero*, *The Architect*).

### 🧬 Developer DNA & Growth Predictor
We don't just count commits; we analyze them. 
- **Developer DNA**: A mathematical breakdown showing what percentage of your coding personality is a **Builder**, **Explorer**, **Architect**, or **Mentor**.
- **1-Year Predictor**: Uses recent commit velocity vs total account age to forecast your Developer Score in one year and predict what Archetype you will evolve into.

### ⚔️ Git Battle Arena
Challenge your friends or coworkers to a coding duel. Enter a challenger's GitHub username to summon an epic, split-screen clash. The algorithm compares Dev Scores and Total Stars, crowning a winner with a "Flawless Victory" graphic and unique post-match commentator remarks.

### 💼 Recruiter Insights Engine
A highly practical tool for job seekers. Generate a rigorous **Recruiter Score** based on Consistency, Documentation, and Project Complexity. It also provides a **Portfolio Readiness %** with an actionable checklist of missing profile elements (like empty bios or un-described repositories).

### 🔥 Dynamic AI Roast Engine
Feeling brave? Our fully client-side Roast Engine mathematically analyzes your primary programming language, exact star count, and commit frequency to stitch together brutally funny, highly personalized insults about your coding habits. 

### 🌌 3D Repository Galaxy
Explore your codebase in interactive 3D. Powered by `@react-three/fiber`, GitWrapped renders your top repositories as an orbiting solar system. Drag, zoom, and explore your digital universe.

### 📸 Yearly Wrapped Export
Generate a gorgeous, Instagram-story-sized graphic card that condenses your Commits, Top Language, Total Stars, and Dev Score for seamless social sharing.

---

## 🛠️ The Tech Stack

GitWrapped leverages a modern, high-performance web stack to achieve fluid animations and a premium SaaS aesthetic:

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Glassmorphism, advanced radial gradients)
- **Animations**: Framer Motion (Morphing text, staggering elements, complex timelines)
- **3D Rendering**: React Three Fiber & Three.js
- **Data Visualization**: Recharts
- **State Management**: Zustand
- **Icons**: Lucide React

---

## 🏗️ Architecture & Rate Limits

Because GitWrapped operates **100% on the client side** without a proxy backend, it communicates directly with the GitHub API. 
To bypass GitHub's strict unauthenticated rate limits (which would block the GraphQL contribution queries), the application uses an **obfuscated token injection** technique. This ensures seamless profile generation and deep contribution graphing for all users without requiring them to set up their own Personal Access Tokens.

---

## 🚀 Run it Locally

To spin up GitWrapped locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/kevinjosh10/GitWrapped.git
cd GitWrapped

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
Navigate to `http://localhost:5173` to experience GitWrapped.

---

<div align="center">
  <i>Designed and engineered with ❤️ for developers who love beautiful interfaces.</i>
</div>
