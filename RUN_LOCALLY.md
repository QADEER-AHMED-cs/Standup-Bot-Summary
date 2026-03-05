# Run StandupAI Locally

This guide will help you set up and run the Smart Daily Standup Bot on your local machine.

## Prerequisites

- **Node.js**: v18 or higher
- **PostgreSQL**: A running instance (or use a service like Neon)
- **OpenAI API Key**: For AI summaries and insights

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd standup-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/standup_db
AI_INTEGRATIONS_OPENAI_API_KEY=your_openai_api_key
AI_INTEGRATIONS_OPENAI_BASE_URL=https://api.openai.com/v1
```

### 4. Database Migration
Push the schema to your local database using Drizzle Kit:

```bash
npm run db:push
```

### 5. Run the Application
Start both the backend server and the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Shadcn UI, Framer Motion, TanStack Query
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI GPT-4o
