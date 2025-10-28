# MunchkinTravelApp

A travel app built with Next.js, TanStack Query and Zod. The app displays a paginated list of countries with search, region filtering, and detailed country pages including weather and images.

## Features

- **Paginated country list** with search and region filter 
- **Country detail pages** with:
  - Flag, name, region, subregion, capital, population, languages, currency, and more
  - Current weather (Open-Meteo API)
  - Image gallery (Unsplash API)
  - Wikipedia summary with source attribution
- **Loading spinners and skeletons** for all major data fetches
- **Error handling** with clear messages and retry options
- **Accessibility**: semantic HTML, ARIA labels, keyboard navigation, alt texts
- **Responsive design**: mobile-first, with breakpoints for tablet and desktop
- **Authentication**: Auth.js with JWT sessions, protected routes, and login status in the UI

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Data Fetching:** TanStack Query (React Query)
- **Validation:** Zod
- **Authentication:** Auth.js (NextAuth)
- **Styling:** CSS Modules
- **Deployment:** Vercel

## Data Sources

- **Countries:** [REST Countries API](https://restcountries.com/v3.1/)
- **Weather:** [Open-Meteo](https://open-meteo.com/)
- **Images:** [Unsplash API](https://unsplash.com/developers)
- **Country Info:** [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/)

## Validation

- The search form is validated with Zod to ensure correct input.
- API-data is also walidated with ZOD.

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd fe24-linn-ahlrot-js3-slutprojekt
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file and add your API keys (see `.env.example` if available).
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Open the app:**
   - Go to [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The app is deployed on Vercel:
[https://your-app-name.vercel.app](https://your-app-name.vercel.app)

## Accessibility & Best Practices

- All interactive elements are keyboard accessible with visible focus states.
- Semantic HTML elements are used throughout.
- The app is responsive and works well on mobile, tablet, and desktop.
