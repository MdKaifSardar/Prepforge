<div align="center">

# ⚡ Tech Interview Engine

**The Enterprise Multi-Domain Technical Interview Preparation Platform**

*Master DSA Algorithmic Patterns, SQL Querying, and Core Computer Science Fundamentals with Production-Grade Blueprints.*

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase_Firestore-12.18-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Domain--Driven_Design-indigo?style=for-the-badge)](#-architecture--directory-structure)

</div>

---

## 📌 Overview

**Tech Interview Engine** is a high-performance, modular web application built for software engineering candidates and interview prep platforms. Unlike static problem lists, it uses a **Pattern-First & Blueprint Methodology** to train candidates in instant algorithmic pattern recognition rather than rote memorization.

Architected with **Domain-Driven Design (DDD)**, the platform is decoupled into self-contained feature modules (**DSA**, **SQL**, **DBMS**, **System Design**) and integrated with a normalized **Firebase Firestore** backend.

---

## ✨ Key Features

### 🧠 Pattern Recognition Engine (DSA)
* **19 Core Algorithmic Patterns:** Hashing, Two Pointers, Sliding Window, Monotonic Stack, DSU, Topological Sort, 1D/2D Dynamic Programming, Bitmasking, and Graph Traversal.
* **Sub-Pattern Blueprints:** Detailed recognition cues, generic C++ templates, time/space complexity bounds, and common interview traps.
* **Curated Problem Suites:** Tested LeetCode problems paired with brute force vs. optimal C++ solutions.

### 🌐 Multi-Domain Extensibility (SQL, DBMS, System Design)
* **Decoupled Feature Modules:** Zero logical collision between DSA, SQL, DBMS, and System Design tracks.
* **Polymorphic Question Engine:** Supports C++ code solutions, SQL DDL schema setups, DBMS conceptual Q&A, and MCQs.

### ⚡ Enterprise Performance & Architecture
* **Normalized Firestore Storage:** Data split across `/patterns`, `/sub_patterns`, and `/questions` collections to prevent document bloat and ensure fast load times.
* **$O(1)$ Problem Routing:** Direct slug-based querying (`/dsa/problem/[slug]`).
* **Offline Resilient Fallback:** Smart service layer automatically falls back to local data if network connectivity drops.
* **Admin Dashboard Ready:** Built-in support for Role-Based Access Control (RBAC) and Draft/Publish status toggles.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Server Components, Server Actions, Turbopack |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type safety across core and feature domains |
| **Database** | [Firebase Firestore 12](https://firebase.google.com/) | Cloud NoSQL normalized multi-collection database |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Glassmorphic, dark-mode first UI design system |
| **Icons** | [Lucide React](https://lucide.dev/) | Modern, lightweight UI iconography |

---

## 🏗️ Architecture & Directory Structure

The project follows **Domain-Driven Design (DDD)**. Shared abstractions live in `src/core/`, while feature modules live inside isolated boundaries in `src/features/`.

```text
interviewprep/
├── scripts/
│   └── run_seed.ts                     # Normalized Firestore database seeder
├── src/
│   ├── core/                           # Shared Kernel (Common Domain Abstractions)
│   │   ├── firebase/                   # Singleton Firebase Initialization
│   │   │   └── firebase.ts
│   │   └── models/                     # Core Interfaces (BaseQuestion, BaseTopic)
│   │       ├── domain.types.ts
│   │       └── user.types.ts
│   │
│   ├── features/                       # Self-Contained Domain Modules
│   │   ├── dsa/                        # DSA Domain (Models, Services, Actions, UI)
│   │   │   ├── actions/dsa.actions.ts
│   │   │   ├── models/dsa.types.ts
│   │   │   └── services/dsa.service.ts
│   │   ├── sql/                        # SQL Domain Module
│   │   │   ├── actions/sql.actions.ts
│   │   │   ├── models/sql.types.ts
│   │   │   └── services/sql.service.ts
│   │   ├── dbms/                       # DBMS Domain Module
│   │   │   ├── actions/dbms.actions.ts
│   │   │   ├── models/dbms.types.ts
│   │   │   └── services/dbms.service.ts
│   │   └── admin/                      # Admin Dashboard Engine
│   │       ├── actions/admin.actions.ts
│   │       └── services/admin.service.ts
│   │
│   └── app/                            # Next.js App Router (Routing Only)
│       ├── page.tsx                    # Main Dashboard
│       ├── dsa/                        # DSA Pattern & Problem Routes
│       ├── sql/                        # SQL Routes
│       └── dbms/                       # DBMS Routes
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** v18.0.0 or higher
* **npm** v9.0.0 or higher
* A **Firebase Project** with Firestore enabled

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/interviewprep.git
cd interviewprep
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Seed Database to Firebase Firestore
Populate your Firestore cloud database with all 19 patterns, sub-patterns, and problem sets:
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Seeding & Schema Normalization

Data in Firestore is organized into three normalized collections:

1. `/patterns` — Lightweight pattern metadata & question counts.
2. `/sub_patterns` — Dedicated sub-pattern blueprints linked by `patternId`.
3. `/questions` — Individual question documents with C++ solutions indexed by `slug`.

To re-seed or sync local data changes to Firestore at any time, run:
```bash
npm run seed
```

---

## 🛣️ Roadmap

- [x] **Phase 1:** DSA Pattern Recognition Engine & 19 Core Blueprints
- [x] **Phase 2:** Normalized Firestore Multi-Collection Architecture
- [x] **Phase 3:** Domain-Driven Design (DDD) Refactoring & Decoupling
- [ ] **Phase 4:** SQL Interactive Schema Runner & DBMS Quiz Engine
- [ ] **Phase 5:** Full Admin Dashboard UI for live Question & Topic CRUD
- [ ] **Phase 6:** User Authentication & Progress Persistence

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
