<div align="center">

# 🎸 GitWrapped

**Your GitHub tells a story.** 

[![Deploy to GitHub Pages](https://github.com/kevinjosh10/GitWrapped/actions/workflows/deploy.yml/badge.svg)](https://github.com/kevinjosh10/GitWrapped/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

GitWrapped transforms your static GitHub profile into a highly polished, interactive, and beautifully animated visual journey. 
Inspired by Spotify Wrapped and Apple Keynotes, it extracts your developer DNA to crown your achievements, expose your coding habits, and visualize your repository ecosystem.

[**View Live Demo**](https://kevinjosh10.github.io/GitWrapped/)

<br />
</div>

---

## ✨ Features

GitWrapped is packed with premium, highly animated components designed to make your developer stats look incredible.

### 🎭 The Wrapped Story
A stunning, slide-based cinematic sequence that walks through your unique developer statistics. Discover your **Developer Archetype**, top languages, and true code footprint with butter-smooth transitions.

### 🌌 3D Repository Galaxy
Explore your codebase in interactive 3D. Using `@react-three/fiber`, GitWrapped renders your top repositories as an orbiting solar system. Drag, zoom, and explore your digital universe.

### ⚔️ Git Battle Mode
Challenge your friends (or enemies) to a stats battle. Enter a challenger's GitHub username to summon a *Street Fighter*-style split-screen clash that compares Dev Scores, Stars, and Contributions to crown the ultimate developer.

### 🔥 Dynamic AI Roast Engine
Feeling brave? Our brutal, fully client-side Roast Engine mathematically analyzes your commit frequency, top languages, and star count to generate highly personalized, deeply savage (but funny) roasts about your coding habits. 

### 📈 Analytics Dashboard
A comprehensive breakdown of your 90-day contribution activity featuring elegant area charts and a customizable trading card that you can export and share on social media.

---

## 🛠️ Technology Stack

GitWrapped is built entirely as a **client-side application**, heavily leveraging modern web primitives for a flawless, 60fps experience.

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Rendering**: Three.js & React Three Fiber
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **API**: GitHub REST & GraphQL APIs

---

## 🚀 Getting Started

To run GitWrapped locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/kevinjosh10/GitWrapped.git
cd GitWrapped
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open in browser
Navigate to `http://localhost:5173` to experience GitWrapped.

---

## 🏗️ Architecture & Rate Limits

Because GitWrapped operates 100% on the client side without a proxy backend, it communicates directly with the GitHub API. 
To bypass GitHub's strict unauthenticated rate limits (which would block the GraphQL contribution queries), the application uses an **obfuscated token injection** technique. This ensures seamless profile generation for all users without requiring them to set up their own Personal Access Tokens.

---

<div align="center">
  <i>Crafted with ❤️ for developers who love beautiful interfaces.</i>
</div>
