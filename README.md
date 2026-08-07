# 💸 SmartSplit

> **AI-Powered Group Expense Management & Smart Settlement Platform**  
> *"Just say it or snap it — SmartSplit does the math."*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![WebSockets](https://img.shields.io/badge/realtime-WebSockets-orange.svg)](#)
[![AI Powered](https://img.shields.io/badge/AI-Powered-purple.svg)](#)



## 📌 Overview

**SmartSplit** is an intelligent, AI-driven group expense management application designed to eliminate friction when splitting bills with friends, roommates, and travel companions. 

Instead of manually typing in line items and calculating proportions, SmartSplit allows users to simply **snap a photo of a receipt** or **type/speak a plain-language prompt**. Powered by AI OCR, Natural Language Processing (NLP), and graph-based debt simplification algorithms, SmartSplit automatically categorizes expenses, predicts involved participants, handles item-wise taxes & tips, and calculates the absolute minimum number of payments required to settle group debts.

---

## ✨ Features

- 🧾 **Receipt OCR & Auto-Itemization**  
  Snap a photo of any receipt. Optical Character Recognition automatically extracts the merchant, date, individual line items, tax, tip, and grand total.

- 💬 **Natural Language Entry**  
  Log complex expenses effortlessly. Type or speak commands like:  
  > *"Dinner $84 at Olive Garden, split equal with Raj and Meena, paid by Alex"*

- 🔮 **AI Participant Prediction**  
  SmartSplit learns your group dynamics over time. Based on receipt categories, time of day, and historical patterns, it proactively predicts who was involved in an expense.

- 🧮 **Flexible & Smart Splitting Options**  
  Split expenses your way:
  - **Equal Split**: Even division across selected members.
  - **Percentage / Ratio Split**: Custom proportions.
  - **Item-Wise Split**: Assign specific dishes or receipt lines directly to individuals.
  - **Fixed Amount**: Define precise individual amounts.

- 🔁 **Smart Duplicate Detection**  
  Built-in perceptual hashing and fuzzy matching prevent duplicate receipts from being logged twice.

- 📊 **Debt Simplification Engine**  
  Uses graph algorithms (Minimum Cash Flow / Greedy Network Flow) to collapse complex webs of group IOUs into the minimum possible number of direct settlements.

- ⚡ **Real-Time Live Sync**  
  Instant WebSocket updates ensure everyone's balance, group feed, and settlement status reflect immediately across all devices.

- 📈 **Analytics & Spending Insights**  
  Visualize financial habits with interactive breakdowns by expense category, time range, individual contributions, and group trends.

---



### 🧮 Debt Simplification Algorithm
SmartSplit optimizes group balances using a Directed Debt Graph approach:
1. Calculates net balance $B_i = \text{Total Paid}_i - \text{Total Owed}_i$ for every participant $i$.
2. Matches the largest net debtor with the largest net creditor recursively.
3. Reduces an $N$-person network from up to $\frac{N(N-1)}{2}$ potential transactions down to a maximum of $N - 1$ simple payments.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React / Next.js, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend API** | Node.js (Express) |
| **Real-time Sync** | Socket.io |
| **Database** | MongoDB |
| **Algorithms** | Greedy Min-Cash-Flow Network Algorithm |

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Garvgoel23/SmartSplit.git
   cd SmartSplit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the root directory and configure your credentials:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@localhost:5432/smartsplit
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or `http://localhost:5000`) in your browser.


