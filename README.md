# Personalized Content Dashboard

A dynamic content dashboard built with Next.js, React, Redux Toolkit, and TypeScript. The application provides personalized news, movie recommendations, content search, saved favorites, dark mode support, and drag-and-drop card reordering.

---

# How to Run the Project

## Prerequisites

Ensure the following are installed:

* Node.js (v18 or later)
* npm

## Installation

Add the following variables to `.env.local`:

```env
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_key_here
```

---

# Running Tests

## Unit and Integration Tests

```bash
npm test
```

## End-to-End Tests

Ensure the development server is running before executing Cypress tests.

```bash
npx cypress run
```

To open the Cypress UI:

```bash
npx cypress open
```

## Production Build

```bash
npm run build
```

---

# Project Structure

```text
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

# Features

* Authentication flow
* Personalized news feed using NewsAPI
* Movie recommendations using TMDB API
* Favorites management
* Debounced search functionality
* Dark mode support
* Drag-and-drop card reordering
* Responsive layout
* Unit and integration testing with Jest and React Testing Library
* End-to-end testing with Cypress

---

# Tech Stack

| Technology                   | Purpose                      |
| ---------------------------- | ---------------------------- |
| Next.js 16                   | Framework                    |
| React                        | UI Library                   |
| TypeScript                   | Type Safety                  |
| Redux Toolkit                | State Management             |
| Tailwind CSS                 | Styling                      |
| Framer Motion                | Animations and Drag-and-Drop |
| Jest + React Testing Library | Unit and Integration Testing |
| Cypress                      | End-to-End Testing           |

---

# Live Demo

Add your deployed application link here:

```text
https://YOUR_LIVE_LINK_HERE
```

---

# Contact

Developed by Adithi.
