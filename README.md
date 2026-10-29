<div align="center">

<img src="public/logo.png" width="380" alt="TypeMaster Logo" />

# TypeMaster — Typing Practice & AI Grammar Rewriter

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-3.8_Flash-orange.svg)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

**A modern, all-in-one keyboard speed training platform and AI-powered multilingual writing assistant.**  
Practice touch typing in **English** and **Bangla (বাংলা)** with real-time telemetry, interactive key-row lessons, engaging games, and an integrated AI Grammar Checker & Text Rewriter.

[Live Demo](http://localhost:3000) • [Features](#-key-features) • [Installation](#-getting-started) • [API & Architecture](#-system-architecture)

---

</div>

## 🌟 Key Features

### ⌨️ Dual-Language Typing Console
- **Bangla (বাংলা) & English Support:** Practice both global English passages and native Bengali scripts with authentic typography.
- **Real-Time Speed & Telemetry:** Instant live calculations of Words Per Minute (WPM), Accuracy percentage, character errors, and countdown timers.
- **Custom Timer Durations:** Choose 15s, 30s, 60s, or 120s speed workouts.
- **Mechanical Sound Effects:** Responsive acoustic click feedback for each keystroke with instant mute/unmute control.
- **Performance Badges:** Earn dynamic ranks from *Steady Learner* to *⚡ Grandmaster Speed* (100+ WPM).

### 🎥 Big Cinematic Hero Video
- **Interactive Showcase Player:** Integrated `herovideo.mp4` with custom glassmorphism bezel and neon ambient backlight.
- **Interactive Video Controls:** Click-to-play/pause, scrubbable progress bar, volume toggle, restart, and fullscreen modes.
- **Quick Action CTAs:** One-click smooth scrolling directly to the typing test console or the AI grammar workshop.

### 🤖 Integrated AI Grammar Checker & Text Rewriter
- **Deep Multilingual Proofreading:** Detects spelling, grammar, punctuation, capitalization, and syntax errors in English and Bengali.
- **One-Click Quick Fix:** Automatically corrects errors with detailed explanations of changes.
- **Style & Tone Rewriter:** Transform text into multiple stylistic tones:
  - 💼 *Professional*
  - 📝 *Simple English*
  - 🏛️ *Formal*
  - 😊 *Friendly*
  - 💡 *Improve Clarity*
- **Dual-Engine Architecture:** Powered by Google's **Gemini 3.8 Flash** with an automatic offline fallback to the high-precision built-in linguistic rules engine when no API key is provided.

### 📚 Learning Center & Skill Drills
- **Finger Placement Guides:** Visual interactive keyboard drills targeting Home Row, Top Row, Bottom Row, and Number/Symbol Rows.
- **Speed Drills:** Focus on weak fingers and improve muscle memory systematically.

### 🎮 Typing Games
- **Time Sprint:** Fast-paced adrenaline drills to shatter personal speed records.
- **Accuracy Defense:** Challenge yourself to achieve 98%+ precision without backspaces.

### 📊 Performance Analytics & Leaderboard
- **Detailed History:** Tracks the last 50 tests in local storage with timestamps, passage snippets, and statistics.
- **Local Leaderboards:** Compare and rank your best scores against preset milestone benchmarks.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 8, Tailwind CSS v4, Motion, Lucide React |
| **Backend** | Node.js, Express 4, `@google/genai` (Gemini SDK) |
| **Engines** | Google Gemini 3.8 Flash + Built-in Multilingual Linguistic Grammar Engine |
| **Aesthetics** | Dark Mode (`#111310`), Neon Lime Accent (`#d7ff64`), Glassmorphism, Responsive Mobile Drawer |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/jasminaramim/-TypeMaster.git
cd -TypeMaster
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables (Optional)
Create a `.env` file in the project root:
```env
# Optional: Set your Gemini API key for cloud AI features
GEMINI_API_KEY="your-gemini-api-key-here"

# Server Port (defaults to 3000)
PORT=3000
```
> *Note: If no Gemini API key is provided, TypeMaster automatically uses its built-in linguistic grammar engine seamlessly.*

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

---

## 📦 Production Build

To build the client bundle for production:
```bash
npm run build
```

To start the server in production mode:
```bash
npm start
```

To run type checking:
```bash
npm run lint
```

---

## 📂 Project Structure

```text
typemaster/
├── public/
│   ├── herovideo.mp4       # Big hero section showcase video
│   └── logo.png            # Official TypeMaster brand logo
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Full-width navigation header with brand logo
│   │   ├── HeroSection.tsx     # Big hero section with video player and CTAs
│   │   ├── TypingTest.tsx      # Main typing test console & telemetry
│   │   ├── GrammarSection.tsx  # AI Grammar Checker & Text Rewriter
│   │   ├── LearningCenter.tsx  # Finger placement drills & lesson center
│   │   ├── TypingGames.tsx     # Interactive typing speed challenges
│   │   ├── HistoryView.tsx     # Historical tests and stats
│   │   ├── LeaderboardView.tsx # Leaderboard ranks and badges
│   │   └── Footer.tsx          # App footer with brand logo and links
│   ├── data/
│   │   └── passages.ts         # Curated English & Bangla practice passages
│   ├── utils/
│   │   ├── grammarEngine.ts    # Built-in fallback linguistic grammar & rewriter engine
│   │   └── sound.ts            # Web Audio mechanical keyboard synthesizer
│   ├── App.tsx                 # Main application controller
│   ├── index.css               # Core design tokens & Tailwind imports
│   └── main.tsx                # React root mount
├── server.ts                   # Express API endpoints & Vite SPA middleware
├── vite.config.ts              # Vite configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Documentation
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
Crafted with ❤️ for typists, writers, and students worldwide.
</div>
