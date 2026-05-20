# 📊 Personalized Content Dashboard

A dynamic content dashboard built with Next.js, React, Redux Toolkit, and TypeScript. It shows personalized news, movie recommendations, and lets users save favorites, search content, toggle dark mode, and drag-and-drop reorder cards.

---

## 🚀 How to Run This Project

### Prerequisites
Make sure you have these installed:
- Node.js (v18 or above)
- npm

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/content-dashboard.git

# 2. Go into the project folder
cd content-dashboard

# 3. Install all dependencies
npm install

# 4. Create a .env.local file and add your API keys
touch .env.local
```

Add this to your `.env.local` file:
```
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_key_here
```

```bash
# 5. Run the development server
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🧪 Running Tests

### Unit + Integration Tests (Jest)
```bash
npm test
```

### E2E Tests (Cypress)
```bash
# Make sure the dev server is running first (npm run dev)
npx cypress run

# Or open the Cypress UI
npx cypress open
```

### Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
content-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       └── ContentCard.tsx
│   │   ├── page.tsx
│   │   └── login/
│   │       └── page.tsx
│   ├── store/
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── contentSlice.ts
│   │       └── preferencesSlice.ts
│   └── __tests__/
│       ├── ContentCard.test.tsx
│       ├── authSlice.test.ts
│       ├── contentSlice.test.ts
│       └── preferencesSlice.test.ts
├── cypress/
│   └── e2e/
│       └── spec.cy.ts
└── public/
```

---

## ✨ Features

- 🔐 Login / Auth flow
- 📰 Personalized news feed using NewsAPI
- 🎬 Movie recommendations using TMDB API
- ❤️ Save to Favorites
- 🔍 Debounced search
- 🌙 Dark mode toggle
- 🔃 Drag and drop card reordering
- 📱 Responsive layout
- ✅ 26 unit/integration tests passing
- ✅ 5/6 E2E tests passing (drag-and-drop interaction verified)

---

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| Next.js 16 | Framework |
| React | UI |
| TypeScript | Type safety |
| Redux Toolkit | State management |
| Tailwind CSS | Styling |
| Framer Motion | Animations + Drag and Drop |
| Jest + RTL | Unit testing |
| Cypress | E2E testing |

---

## 🌐 Live Demo

[Click here to view the live app](https://YOUR_LIVE_LINK_HERE)

---

## 📬 Contact

Made by Adithi — feel free to reach out!