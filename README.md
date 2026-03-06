# ✨ StandupAI - Smart Daily Standup Bot

> Transform your raw daily updates into professional, insight-driven standup summaries with GPT-4o.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

## 🚀 Overview

StandupAI is a modern full-stack application designed to streamline team communication. It takes your raw notes about yesterday's work, today's plans, and current blockers, then uses advanced AI to generate a polished, emoji-rich summary. 

Beyond just reformatting, it provides **AI-powered insights** to highlight potential weak areas, vague plans, or unresolved blockers, helping you and your team stay accountable and focused.

## 🌟 Key Features

- **🤖 AI Summarization**: Powered by GPT-4o for professional, concise updates.
- **🔍 Weak Area Detection**: Automatically identifies gaps in your daily planning.
- **📅 History Feed**: Persistent storage of all past standups.
- **🎨 Modern UI**: Built with Shadcn UI, Tailwind CSS, and Framer Motion for smooth animations.
- **📱 Responsive Design**: Fully functional on desktop, tablet, and mobile.
- **⚡ Real-time Updates**: Instant feed refresh upon submission using TanStack Query.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.
- **Database**: PostgreSQL with Drizzle ORM.
- **AI Integration**: OpenAI GPT-4o via Replit AI Integrations.

## 📂 Project Structure

```text
├── client/           # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # UI components (Form, Feed, etc.)
│   │   ├── hooks/       # Custom React hooks (Data fetching)
│   │   └── pages/       # Application pages
├── server/           # Express backend
│   ├── routes.ts     # API endpoints & AI logic
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection setup
└── shared/           # Shared types and schemas
    ├── schema.ts     # Drizzle database schema
    └── routes.ts     # API contract definitions
```

## ⚙️ Setup & Installation

To run this project locally, please refer to the [RUN_LOCALLY.md](./RUN_LOCALLY.md) guide.

## 📝 Usage

1. **Input**: Fill in your "Yesterday's Work", "Today's Plan", and any "Blockers".
2. **Generate**: Click the "Generate Summary" button.
3. **Review**: See your formatted summary appear instantly in the Activity Feed.
4. **Iterate**: Use the "Insights & Weak Areas" section to improve your next update!
