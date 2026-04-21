# SmartSpace NUL

**SmartSpace NUL** is a demo dashboard for an AI-powered study space optimisation concept on a university campus. It presents occupancy, energy, predictions, and IoT telemetry in a dark, sustainability-themed interface (emerald accents). All metrics are driven by **local JSON seed data** with a lightweight **live simulation** so values drift over time—no backend or API required.

## Tech stack

- [React](https://react.dev/) 19 (hooks: `useState`, `useEffect`)
- [Vite](https://vitejs.dev/) 6
- [Tailwind CSS](https://tailwindcss.com/) 3 (utility classes only in components)
- [Recharts](https://recharts.org/) for charts
- [Lucide React](https://lucide.dev/) for icons

## Features

- **Sidebar navigation** (desktop) and **horizontal nav** (mobile): Overview, Study Spaces, Energy Monitor, Predictions, Settings
- **Overview**: summary stat cards, occupancy bar chart, peak-hours line chart, IoT device strip
- **Study Spaces**: searchable/filterable room cards with occupancy, temperature, lighting, and status badges
- **Energy Monitor**: seven-day actual vs baseline line chart, CO₂ avoided stat, donut breakdown (HVAC, Lighting, Other)
- **Predictions**: room-by-hour heatmap table (green = low demand, red = high)
- **Settings**: local preference toggles and demo refresh interval slider

## Getting started

### Prerequisites

- Node.js 18 or newer recommended
- npm (ships with Node)

### Install and run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Other scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint               |

## Project structure

```
src/
  App.jsx                 # Shell layout, routing between sections
  main.jsx
  index.css               # Tailwind directives
  navConfig.js            # Sidebar / mobile nav items and icons
  data/
    dashboard.json        # Seed data (edit to change charts and copy)
  hooks/
    useLiveDashboard.js   # Clones JSON and periodically jitters values
  components/
    Sidebar.jsx
    MobileNav.jsx
    StatCard.jsx
    IotStrip.jsx
  pages/
    OverviewPage.jsx
    StudySpacesPage.jsx
    EnergyPage.jsx
    PredictionsPage.jsx
    SettingsPage.jsx
```

## Customising data

Edit **`src/data/dashboard.json`**. The hook **`useLiveDashboard`** imports this file (via the bundler), deep-clones it into React state, and applies small random adjustments on an interval so the UI feels alive. To change the update cadence, adjust the argument passed to `useLiveDashboard` in `App.jsx` (milliseconds).

## Production build

```bash
npm run build
```

Static output is written to **`dist/`**. Deploy `dist/` to any static host, or use `npm run preview` to verify the build locally.

## Licence

Private project (`"private": true` in `package.json`). Add a licence file if you intend to open-source the repository.
