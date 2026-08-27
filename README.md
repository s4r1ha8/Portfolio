# Sarthak Patil — Engineering Portfolio

> **Don't browse my portfolio. Query it.**

A queryable, SQL-driven portfolio built with React + TypeScript + Vite.  
Instead of clicking through pages, visitors type SQL queries to explore projects, skills, and contact info — all rendered as beautiful visual components.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── layout/        # NavBar
│   ├── project/       # ArchitectureDiagram (interactive project explorer)
│   ├── query/         # QueryBar (SQL input with syntax highlighting)
│   └── results/       # ResultsPanel + ProjectCard
├── data/              # Static data: projects, skills, about, contact
│   ├── types.ts       # Shared TypeScript types
│   ├── index.ts       # Central data export
│   ├── projects.ts
│   ├── skills.ts
│   ├── about.ts
│   ├── certifications.ts
│   └── contact.ts
├── engine/            # SQL query parser & executor
│   ├── parser.ts      # Tokeniser + AST builder
│   ├── executor.ts    # Query runner against data
│   ├── types.ts       # Engine-specific types
│   └── index.ts
├── hooks/
│   └── useQuery.ts    # Query state machine hook
├── pages/
│   ├── HomePage.tsx   # Main query interface
│   └── ProjectPage.tsx# Interactive project architecture view
├── styles/
│   ├── tokens.css     # Design tokens (colours, spacing, typography)
│   ├── reset.css      # CSS reset
│   ├── animations.css # Keyframe animations
│   └── index.css      # Global styles + utility classes
├── App.tsx            # Router setup
└── main.tsx           # Entry point

docs/
└── CONCEPT.md         # Original design brief & vision document

public/
├── favicon.svg
└── aws-saa-badge.png
```

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Styling | Vanilla CSS (design tokens) |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

---

## 💡 How the Query Engine Works

1. **QueryBar** captures input and calls `useQuery`
2. **`engine/parser.ts`** tokenises and builds an AST from the SQL string
3. **`engine/executor.ts`** runs the AST against the in-memory data tables
4. **ResultsPanel** renders the output as visual components (cards, tables, contact blocks)

Supported syntax: `SELECT`, `FROM`, `WHERE`, `ORDER BY`, `LIMIT`, `AND`, `OR`, `LIKE`, `=`, `!=`, `>`, `ASC`, `DESC`

---

## 📄 License

MIT
