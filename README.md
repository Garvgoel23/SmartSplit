# SplitWise+

**AI-powered group expense management.** Upload a receipt or just describe an expense in plain language — SplitWise+ extracts, itemizes, categorizes, predicts participants, and optimizes settlements automatically.

> *"Just say it or snap it — SplitWise+ does the math."*

---

## ✨ Features

- 🧾 **Receipt OCR** — snap a photo, get merchant, line items, tax, and total extracted automatically
- 💬 **Natural language entry** — type "Dinner $84, split with Raj and Meena" and it's done
- 🔮 **Participant prediction** — AI suggests who was likely involved, based on group history
- 🧮 **Smart splitting** — equal, percentage, item-wise, or custom fixed-amount splits
- 🔁 **Duplicate detection** — never accidentally log the same receipt twice
- 📊 **Debt simplification** — minimum-transaction settlement using graph algorithms
- ⚡ **Real-time sync** — live updates across group members via WebSockets
- 📈 **Analytics dashboard** — spending insights by category, time, and group

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js, TypeScript, Tailwind CSS, Shadcn/UI, Zustand, React Query, Socket.io Client |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, Clerk Auth, Socket.io |
| **AI** | Gemini Vision (OCR), Gemini 2.5 (NLP, prediction, insights) |
| **Infra** | Docker |

---

## 📁 Project Structure

This is a monorepo:

```
splitwise-plus/
├── client/       # Next.js frontend
├── server/       # Express backend (API, sockets, business logic)
├── ai-service/   # Gemini-based AI microservice
├── shared/       # Shared types/utilities across packages
├── docs/         # Documentation
└── docker/       # Containerization & deployment configs
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Docker & Docker Compose
- MongoDB instance (local via Docker, or Atlas)
- Clerk account (for authentication keys)
- Google AI Studio / Gemini API key

### Installation

```bash
# Clone the repo
git clone https://github.com/Garvgoel23/SmartSplit.git
cd SmartSplit

# Install dependencies for all workspaces
npm install
```

### Environment Variables

Create a `.env` file in `server/` and `ai-service/` (see `.env.example` in each):

```bash
# server/.env
MONGODB_URI=mongodb://localhost:27017/splitwise-plus
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
AI_SERVICE_URL=http://localhost:5001
PORT=5000

# ai-service/.env
GEMINI_API_KEY=your_gemini_api_key
PORT=5001

# client/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Run with Docker Compose

```bash
docker compose -f docker/docker-compose.yml up --build
```

### Run Locally (without Docker)

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — AI service
cd ai-service && npm run dev

# Terminal 3 — frontend
cd client && npm run dev
```

The app should now be running at `http://localhost:3000`.

---

## 🧩 Core Modules

**Backend:** Clerk auth integration, group management, expense APIs, balance engine, debt simplification algorithm, Socket.io events, analytics service.

**AI Service:** Receipt OCR, item extraction, category prediction, natural language parsing, participant prediction, duplicate detection, spending insights.

**Frontend:** Dashboard, groups, expenses, settlements, analytics, profile/settings, receipt upload, AI suggestions, real-time updates.

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details
