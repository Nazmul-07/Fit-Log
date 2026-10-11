# FitLog — Train with intent

FitLog is a focused workout library and training log. Browse 12 lifts, learn their
equipment and instructions, and build a daily plan without losing track of your
saved or completed exercises.

## Built with

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4 and responsive custom CSS
- FitLog exercise API: `https://openapi.programming-hero.com/api/fitlog`
- Browser `localStorage` for the plan, saved lifts, and completions

## Features

1. Responsive workout library with exercise images, muscle-group tags, and stats.
2. Search by exercise or muscle group; sort workouts by duration, calories, or rating.
3. Dedicated workout pages with equipment, difficulty, training specs, and instructions.
4. Add up to five active lifts at a time, mark lifts complete, then load more.
5. Save lifts for later and manage both collections from the My Plan page.
6. Live plan totals for exercise count, training time, and estimated calories.
7. Toast feedback, persistent browser storage, and a custom not-found page.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Workout data is fetched from
the FitLog API; an API or network error is reported rather than silently replaced
with placeholder exercises. Your plan and saved lifts are stored in this
browser, so they persist across reloads on the same device.

## Production

```bash
npm run build
npm run start
```

Deploy as a Next.js Node.js application so the App Router can serve and reload
deep links such as `/my-plan` and `/workouts/1`. The workout API and exercise
image host must be reachable from the deployment and the visitor's browser.
